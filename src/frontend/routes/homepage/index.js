import React, {useState, useEffect, useRef} from "react";
import Page from "../../components/page";
import Actuality from "../../components/actuality";
// import AnimateHeight from 'react-animate-height';
import FlipMove from 'react-flip-move';
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import axios from 'axios'
const access_token = 'IGQVJVLTVaLTRpaE1NU1NZAMi1ncFNka01QVktuX2xKUnEwdlR6dG1EX0pibVJBX2J3TEJpM0dFMWY5SHU3NjhEd2ZAFLTF5TFFnRVlhb0tKdXNOU1pNdTZASM0swV2JKSThNanpmNFJXVmlHbHk1TkZAqNgZDZD'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source)

const monthName = {
  "01": 'Leden',
  "02": 'Únor',
  "03": 'Březen',
  "04": 'Duben',
  "05": 'Květen',
  "06": 'Červen',
  "07": 'Červenec',
  "08": 'Srpen',
  "09": 'Září',
  "10": 'Říjen',
  "11": 'Listopad',
  "12": 'Prosinec'
}

const formDate = date => {
  var dateArr = date.split('-')
  return [dateArr[2], monthName[dateArr[1]]]
}

const uvod = `*[_type == "top"] {
  title,
  content,
  image
}[0...1]
`;

const date = new Date()
if(date.getDate() < 10){
  var nowDay = '0' + date.getDate()
}else{
  var nowDay = date.getDate()
}

if(date.getMonth() < 10){
  var nowMonth = '0' + (date.getMonth() + 1)
}else{
  var nowMonth = date.getMonth() + 1
}


const query = `*[_type == "programs" && date >= "${date.getFullYear()}-${nowMonth}-${nowDay}"] {
  date,
  title,
  content,
  links
} | order(date asc)[0...7]
`;

const queryGlobal = `*[_type == "global"] {
  _id,
  title,
  description,
  address,
  body,
  titleProgram
}[0...1]
`;


const serializers = {
  marks: {
    link: props => {
      return props.mark.target ? (
        <a href={props.mark.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      ) : (
        <a href={props.mark.href}>{props.children}</a>
      );
    }
  }
};

const Home = () => {

  const [top, setTop] = useState([])
  const [program, setProgram] = useState([])
  const [globalInfo, setGlobalInfo] = useState([])

  const [offset, setOffset] = useState(7)
  const [idsInstagram, setIdsInstagram] = useState([])
  const [images, setImages] = useState([])
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    sanityClient
      .fetch(uvod)
      .then(data => setTop(data))
      .catch(err => console.log(err));
    sanityClient
      .fetch(query)
      .then(data => setProgram(data))
      .catch(err => console.log(err));
    sanityClient
      .fetch(queryGlobal)
      .then(data => setGlobalInfo(data))
      .catch(err => console.log(err));

    axios.get('https://graph.instagram.com/17841407200262017?fields=media&access_token=' + access_token)
      .then(res => {
        console.log(res.data);
        setIdsInstagram([...res.data.media.data])
      })
  }, [])

  useEffect(() => {
    calculateHeight()
  })

  useEffect(() => {
    getPhoto()
  }, [idsInstagram])

  const calculateHeight = () => {
    if(document.getElementsByClassName('accordion-item').length){
      var newHeight = 0;
      [...document.getElementsByClassName('accordion-item')].map((item) => {
        newHeight += +item.clientHeight
      })
      setHeight(newHeight)
    }
  }

  const getPhoto = async () => {
    if(idsInstagram.length){
      var newImages = []
      for(var i = 0; i < idsInstagram.length; i++){
        const res = await axios.get('https://graph.instagram.com/'+idsInstagram[i].id+'?fields=media_url,permalink&access_token=' + access_token)
        newImages.push({imageUrl: res.data.media_url, link: res.data.permalink})
      }
      setImages(newImages)
    }
  }




  const getMore = () => {
    setOffset(offset + 7)
    var newQuery = `*[_type == "programs" && date > "${date.getFullYear()}-${nowMonth}-${nowDay}"] {
      date,
      title,
      content,
      links
    } | order(date asc)[${offset}...${offset + 7}]
    `;
    sanityClient
      .fetch(newQuery)
      .then(data => setProgram([...program, ...data]))
      .catch(err => console.log(err));
  }


  const openComponent = () => {
    setHeight('auto')
  }

  console.log(program);


  if (globalInfo.length && top.length) {
    return (
      <Page id="homepage" description={globalInfo[0].description} title={globalInfo[0].title}>

        <section className="section_top" id="link_to_1">
          <div className="uk-container-expand">
            <div className="uk-grid uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@m" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 500">
              <div><img src={urlFor(top[0].image).ignoreImageParams()} title={top[0].image.attribution} alt={top[0].title} loading="lazy" /></div>
              <div>
                <div className="content_wrap">
                  <h1 className="accent_head">{top[0].title}</h1>
                  <BlockContent blocks={top[0].content} serializers={serializers} />
                </div>
              </div>
            </div>
          </div>
        </section>


        {program.length && <section className="program" id="link_to_2">
          <div className="uk-container">
            <h2 className="accent_head">{globalInfo[0].titleProgram}</h2>
            <FlipMove typeName="ul" uk-accordion="" uk-scrollspy="target: > li; cls: uk-animation-fade; delay: 500">
              {program.map((item, index) =>
                <li key={index} className="accordion-item" onClick={e => openComponent()}>
                  <a className="uk-accordion-title" href="#">
                    <div className="program-date">
                      <span>{formDate(item.date)[1]}</span>
                      <span>{formDate(item.date)[0]}</span>
                    </div>
                    <h4 className="program-title">{item.title}</h4>
                  </a>
                  <div className="uk-accordion-content">
                    <div></div>
                    <div>
                      <BlockContent blocks={item.content} serializers={serializers} />
                      {item?.links?.link1 && <span><a href={item.links.link1} target="_blank" rel="noopener">{item.links.link1}</a><br/></span>}
                      {item?.links?.link2 && <span><a href={item.links.link2} target="_blank" rel="noopener">{item.links.link2}</a><br/></span>}
                      {item?.links?.link3 && <span><a href={item.links.link3} target="_blank" rel="noopener">{item.links.link3}</a><br/></span>}
                    </div>
                  </div>
                </li>)}
              </FlipMove>
            <button className="button-more" onClick={() => getMore()} uk-scrollspy="cls: uk-animation-fade; delay: 2000">další akce</button>
          </div>
        </section>}

        <Actuality />

        <section className="instagram" id="link_to_4">
          {images.length && <div className="uk-container">
            <div className="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s" uk-grid="">
              {images.slice(0, 6).map((item, index) => <div key={index}>
                <a href={item.link} target="_blank" rel="noopener" className="instagram-wrap-item">
                  <span className="instagram-icon"></span>
                  <img src={item.imageUrl} alt="instagram" />
                </a>
              </div>)}
            </div>
          </div>}
        </section>
      </Page>
    );
  }
  return <h2>Loading posts...</h2>;
}

export default Home
