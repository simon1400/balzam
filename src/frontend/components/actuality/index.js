import React, {useEffect, useState} from "react";
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanityClient);

const urlFor = source => imageBuilder.image(source);

const query = `*[_type == "actuality" && hidden != false] {
  title,
  mainImage,
  body
}[0...100]
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

const Actuality = () => {

  const [actuality, setActuality] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(body => setActuality([...body]))
      .catch(err => console.log(err));
  }, [])

  if (actuality.length) {
    return (
      <section id="link_to_4" className="section_4">
      <div className="uk-container">
        {actuality.map((item, index) =>
            <div className="uk-grid uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@s" key={index} >
              <div>
                {index % 2
                  ? <div className="content_wrap">
                      <h2 className="accent_head">{item.title}</h2>
                      <BlockContent blocks={item.body} serializers={serializers} />
                    </div>
                 : <div className="content_img">
                    <img src={urlFor(item.mainImage).width(665).url()} title={item.mainImage.attribution} alt={item.mainImage.attribution} />
                  </div>}
              </div>
              <div>
                {index % 2
                  ? <div className="content_img"><img src={urlFor(item.mainImage).ignoreImageParams()} title={item.mainImage.attribution} alt={item.mainImage.attribution} /></div>
                  : <div className="content_wrap">
                      <h2 className="accent_head">{item.title}</h2>
                      <BlockContent blocks={item.body} serializers={serializers} />
                    </div>}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
  return <h2>Loading posts...</h2>;
}

export default Actuality
