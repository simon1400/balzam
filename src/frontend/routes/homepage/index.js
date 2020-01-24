import React, {useState, useEffect} from "react";
import Page from "../../components/page";
import Actuality from "../../components/actuality";

import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import axios from 'axios'
const access_token = 'IGQVJWMFgwNWVTZA21mT1J4X3Rxa0VBNG5xX2tKM2lILTh4d25oOEJYdmJpb09OR1M5RUpYamk1OUpKeHppVFhwSUNFS25XdDYwV1p0UTNJQVZADNzhuemh6X2xpZA1k1eXNHX1YzckZAR'

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

const query = `*[_type == "programs"] {
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
        console.log(res);
        setIdsInstagram([...res.data.media.data])
      })
  }, [])

  useEffect(() => {
    getPhoto()
  }, [idsInstagram])

  const getPhoto = async () => {
    if(idsInstagram.length){
      var newImages = []
      for(var i = 0; i < idsInstagram.length; i++){
        const res = await axios.get('https://graph.instagram.com/'+idsInstagram[i].id+'?fields=media_url,permalink&access_token=' + access_token)
        newImages.push({imageUrl: res.data.media_url, link: res.data.permalink})
      }

      console.log(newImages);
      setImages(newImages)
    }
  }


  const getMore = () => {
    setOffset(offset + 7)
    var newQuery = `*[_type == "programs"] {
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

  if (program.length && globalInfo.length && top.length) {
    return (
      <Page id="homepage" description={globalInfo[0].description} title={globalInfo[0].title}>

        <section className="section_top" id="link_to_1">
          <div className="uk-container-expand">
            <div className="uk-grid uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@m">
              <div><img src={urlFor(top[0].image).ignoreImageParams()} title={top[0].image.attribution} alt={top[0].image.attribution} /></div>
              <div>
                <div className="content_wrap">
                  <h1 className="accent_head">{top[0].title}</h1>
                  <BlockContent blocks={top[0].content} serializers={serializers} />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="program" id="link_to_2">
          <div className="uk-container">
            <h2 className="accent_head">{globalInfo[0].titleProgram}</h2>
            <ul uk-accordion="">
              {program.map((item, index) =>
                <li key={index} className="accordion-item">
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
                      {item.links.link1 && <span><a href={item.links.link1} target="_blank">{item.links.link1}</a><br/></span>}
                      {item.links.link2 && <span><a href={item.links.link2} target="_blank">{item.links.link2}</a><br/></span>}
                      {item.links.link3 && <span><a href={item.links.link3} target="_blank">{item.links.link3}</a><br/></span>}
                    </div>
                  </div>
                </li>)}
            </ul>
            <button className="button-more" onClick={() => getMore()}>další akce</button>
          </div>
        </section>

        <Actuality />

        {images.length && <section className="instagram" id="link_to_4">
          <div className="uk-container">
            <div className="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s" uk-grid="">
              {images.slice(0, 6).map((item, index) => <div key={index}>
                <a href={item.link} target="_blank" className="instagram-wrap-item">
                  <span className="instagram-icon"></span>
                  <img src={item.imageUrl} alt="instagram" />
                </a>
              </div>)}
            </div>
          </div>
        </section>}
      </Page>
    );
  }
  return <h2>Loading posts...</h2>;
}

export default Home
