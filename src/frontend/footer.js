import React from "react";

import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../lib/sanity.js";

const query = `*[_type == "global"] {
  _id,
  address,
  body
}[0...3]
`;

const BlockRenderer = props => {
  const style = props.node.style || "normal";

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, "");
    return <h2 className={`my-heading level-${level}`}>{props.children}</h2>;
  }

  return style === "blockquote" ? (
    <blockquote className="my-block-quote">{props.children}</blockquote>
  ) : (
    <p className="my-paragraph">{props.children}</p>
  );
};

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    sanityClient
      .fetch(query)
      .then(this.getData)
      .catch(err => console.log(err));
  }

  getData(info) {
    this.setState({
      info: info
    });
  }

  render() {
    if (this.state.info[0]) {
      var info = this.state.info[0];
      return (
        <footer id="link_to_5">
          <div className="uk-container">
            <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s">
              <div className="uk-hidden@s">
                <div className="logo_footer uk-text-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="350" height="108">
                  <path d="M160 91.69h-19.8a.69.69 0 01-.69-.69V4a3.42 3.42 0 00-3.43-3.44h-10A3.42 3.42 0 00122.64 4v100a3.42 3.42 0 003.43 3.43H160a3.42 3.42 0 003.43-3.43v-8.88a3.43 3.43 0 00-3.43-3.43m.62 12.25a.69.69 0 01-.69.69h-33.8a.69.69 0 01-.68-.69V4.06a.69.69 0 01.68-.69H136a.69.69 0 01.69.69v87a3.43 3.43 0 003.43 3.43h19.79a.69.69 0 01.69.69zm13.73 3.5h39.55a3.42 3.42 0 003.43-3.43v-8.89a3.43 3.43 0 00-3.43-3.43h-22.19a.68.68 0 01-.64-.91l27.48-79.84a3.45 3.45 0 00.19-1.11V4A3.43 3.43 0 00215.3.56h-39.54A3.42 3.42 0 00172.33 4v8.89a3.43 3.43 0 003.43 3.43H198a.69.69 0 01.65.91l-27.54 79.82a3.56 3.56 0 00-.19 1.12V104a3.43 3.43 0 003.43 3.43m-.62-9.31a.85.85 0 010-.22l27.51-79.86A3.43 3.43 0 00198 13.5h-22.2a.69.69 0 01-.69-.69V4.06a.69.69 0 01.69-.69h39.41a.69.69 0 01.69.69v5.8a.85.85 0 010 .23L188.38 90a3.43 3.43 0 003.25 4.55h22.2a.69.69 0 01.69.69v8.75a.69.69 0 01-.69.69h-39.41a.69.69 0 01-.69-.69zM346.57.56h-8.06a3.43 3.43 0 00-3.24 2.29l-14.66 41.59-14.67-41.59a3.43 3.43 0 00-3.23-2.29h-8.06A3.43 3.43 0 00291.21 4v100a3.43 3.43 0 003.44 3.43h10a3.43 3.43 0 003.43-3.43V55.55l9.52 27a3.18 3.18 0 006 0l9.51-27V104a3.43 3.43 0 003.44 3.43h10A3.43 3.43 0 00350 104V4a3.43 3.43 0 00-3.43-3.44m.62 103.38a.69.69 0 01-.69.69h-9.88a.68.68 0 01-.68-.69V43.79a.69.69 0 00-1.34-.23l-13.43 37.89a.59.59 0 01-.56.4.6.6 0 01-.57-.4l-13.43-37.89a.68.68 0 00-1.33.23v60.15a.69.69 0 01-.69.69h-9.88a.68.68 0 01-.68-.69V4.06a.68.68 0 01.68-.69h8a.69.69 0 01.65.46L320 50.5a.68.68 0 001.29 0l16.59-46.67a.69.69 0 01.65-.46h8a.69.69 0 01.69.69z" fill="#fff"/>
                  <path d="M108 91.69H61.09a3.44 3.44 0 00-3.43 3.43V104a3.43 3.43 0 003.43 3.43H108a3.42 3.42 0 003.43-3.43v-8.88a3.43 3.43 0 00-3.43-3.43m.62 12.25a.69.69 0 01-.68.69H61.16a.69.69 0 01-.69-.69v-8.75a.69.69 0 01.69-.69h46.73a.69.69 0 01.68.69z" fill="#c5a45a"/>
                  <path d="M61.61 84.66h10a3.42 3.42 0 003.41-3l2.24-19.15a.7.7 0 01.68-.61H91.1a.68.68 0 01.68.61l2.36 19.16a3.43 3.43 0 003.4 3h9.9a3.43 3.43 0 003.4-3.91L100.07 3.51a3.44 3.44 0 00-3.4-2.95H72.48a3.42 3.42 0 00-3.39 2.95L58.21 80.75a3.43 3.43 0 003.4 3.91M61 81.07L71.82 4a.69.69 0 01.68-.59h24a.67.67 0 01.68.59L108 81.07a.68.68 0 01-.68.78H97.5a.7.7 0 01-.68-.6l-2.47-19.19a3.44 3.44 0 00-3.4-3H78.1a3.44 3.44 0 00-3.41 3l-2.47 19.19a.68.68 0 01-.68.6h-9.86a.69.69 0 01-.68-.78" fill="#fff"/>
                  <path d="M80.24 48.94h8.56a3.44 3.44 0 003.41-3.87l-3.67-28.58a3.43 3.43 0 00-3.41-3h-1.22a3.43 3.43 0 00-3.4 3l-3.67 28.58a3.44 3.44 0 003.4 3.87m-.84-3.58l3.46-28.45a.68.68 0 01.68-.6h2a.68.68 0 01.68.6l3.56 28.44a.69.69 0 01-.68.77h-9a.68.68 0 01-.68-.76" fill="#fff"/>
                  <path d="M276.53.56h-46.86A3.42 3.42 0 00226.24 4v8.89a3.43 3.43 0 003.43 3.43h46.86a3.43 3.43 0 003.47-3.44V4a3.42 3.42 0 00-3.47-3.44m.62 12.25a.69.69 0 01-.69.69h-46.72a.69.69 0 01-.69-.69V4.06a.69.69 0 01.69-.69h46.72a.69.69 0 01.69.69z" fill="#c5a45a"/>
                  <path d="M268.64 26.3a3.42 3.42 0 00-3.39-3h-24.19a3.44 3.44 0 00-3.4 2.95l-10.87 77.24a3.43 3.43 0 003.4 3.91h10a3.43 3.43 0 003.41-3l2.24-19.15a.68.68 0 01.68-.6h13.15a.68.68 0 01.68.6l2.36 19.17a3.42 3.42 0 003.4 3H276a3.43 3.43 0 003.4-3.9zm7.3 78.33h-9.86a.68.68 0 01-.68-.6l-2.47-19.19a3.43 3.43 0 00-3.4-3h-12.86a3.43 3.43 0 00-3.4 3L240.8 104a.69.69 0 01-.68.6h-9.86a.69.69 0 01-.68-.78l10.82-77.08a.69.69 0 01.68-.59h24a.69.69 0 01.68.59l10.82 77.11a.69.69 0 01-.68.78" fill="#fff"/>
                  <path d="M257.11 39.28a3.42 3.42 0 00-3.4-3h-1.22a3.42 3.42 0 00-3.4 3l-3.67 28.57a3.43 3.43 0 003.4 3.87h8.56a3.43 3.43 0 003.4-3.87zm.58 29.63h-9a.69.69 0 01-.68-.77l3.46-28.44a.68.68 0 01.68-.61h2a.68.68 0 01.68.6l3.56 28.45a.69.69 0 01-.68.77M32.35 85.36V68.2c0-5.48-3.66-9.14-9.14-9.14h-5.72a3.44 3.44 0 00-3.43 3.43v28.58a3.43 3.43 0 003.43 3.43h5.72c5.48 0 9.14-3.65 9.14-9.14M16.88 91V62.56a.67.67 0 01.68-.68h5.65a6 6 0 016.32 6.32v17.16a6 6 0 01-6.32 6.33h-5.65a.68.68 0 01-.68-.69" fill="#fff"/>
                  <path d="M46.41 84.24V70.88c0-6.77-2.22-12.37-6-16.42a.66.66 0 010-.92c3.8-4 6-9.65 6-16.42V23.76c0-13.92-9.28-23.2-23.2-23.2H3.43A3.43 3.43 0 000 4v100a3.43 3.43 0 003.43 3.43h19.78c14.06 0 23.2-9.14 23.2-23.2m-43.6 19.7V4.06a.69.69 0 01.69-.69h19.71c12.23 0 20.39 8.16 20.39 20.39v13.36c0 6-1.92 11-5.37 14.55a3.36 3.36 0 000 4.66c3.45 3.55 5.37 8.55 5.37 14.55v13.36c0 12.23-8.16 20.39-20.39 20.39H3.5a.69.69 0 01-.69-.69" fill="#fff"/>
                  <path d="M17.49 48.94h5.72c5.48 0 9.14-3.66 9.14-9.15V22.64c0-5.49-3.66-9.14-9.14-9.14h-5.72a3.43 3.43 0 00-3.43 3.43V45.5a3.44 3.44 0 003.43 3.44M16.88 17a.68.68 0 01.68-.69h5.65a6 6 0 016.32 6.33v17.15a6 6 0 01-6.32 6.33h-5.65a.67.67 0 01-.68-.68z" fill="#fff"/>
                </svg>
                </div>
              </div>
              <div>
                <div className="contacts_top">
                  <BlockContent blocks={info.address} serializers={{ types: { block: BlockRenderer } }} />
                </div>
              </div>
              <div className="uk-text-right@s">
                <div className="logo_footer uk-text-right uk-visible@s">
                <svg xmlns="http://www.w3.org/2000/svg" width="350" height="108">
                  <path d="M160 91.69h-19.8a.69.69 0 01-.69-.69V4a3.42 3.42 0 00-3.43-3.44h-10A3.42 3.42 0 00122.64 4v100a3.42 3.42 0 003.43 3.43H160a3.42 3.42 0 003.43-3.43v-8.88a3.43 3.43 0 00-3.43-3.43m.62 12.25a.69.69 0 01-.69.69h-33.8a.69.69 0 01-.68-.69V4.06a.69.69 0 01.68-.69H136a.69.69 0 01.69.69v87a3.43 3.43 0 003.43 3.43h19.79a.69.69 0 01.69.69zm13.73 3.5h39.55a3.42 3.42 0 003.43-3.43v-8.89a3.43 3.43 0 00-3.43-3.43h-22.19a.68.68 0 01-.64-.91l27.48-79.84a3.45 3.45 0 00.19-1.11V4A3.43 3.43 0 00215.3.56h-39.54A3.42 3.42 0 00172.33 4v8.89a3.43 3.43 0 003.43 3.43H198a.69.69 0 01.65.91l-27.54 79.82a3.56 3.56 0 00-.19 1.12V104a3.43 3.43 0 003.43 3.43m-.62-9.31a.85.85 0 010-.22l27.51-79.86A3.43 3.43 0 00198 13.5h-22.2a.69.69 0 01-.69-.69V4.06a.69.69 0 01.69-.69h39.41a.69.69 0 01.69.69v5.8a.85.85 0 010 .23L188.38 90a3.43 3.43 0 003.25 4.55h22.2a.69.69 0 01.69.69v8.75a.69.69 0 01-.69.69h-39.41a.69.69 0 01-.69-.69zM346.57.56h-8.06a3.43 3.43 0 00-3.24 2.29l-14.66 41.59-14.67-41.59a3.43 3.43 0 00-3.23-2.29h-8.06A3.43 3.43 0 00291.21 4v100a3.43 3.43 0 003.44 3.43h10a3.43 3.43 0 003.43-3.43V55.55l9.52 27a3.18 3.18 0 006 0l9.51-27V104a3.43 3.43 0 003.44 3.43h10A3.43 3.43 0 00350 104V4a3.43 3.43 0 00-3.43-3.44m.62 103.38a.69.69 0 01-.69.69h-9.88a.68.68 0 01-.68-.69V43.79a.69.69 0 00-1.34-.23l-13.43 37.89a.59.59 0 01-.56.4.6.6 0 01-.57-.4l-13.43-37.89a.68.68 0 00-1.33.23v60.15a.69.69 0 01-.69.69h-9.88a.68.68 0 01-.68-.69V4.06a.68.68 0 01.68-.69h8a.69.69 0 01.65.46L320 50.5a.68.68 0 001.29 0l16.59-46.67a.69.69 0 01.65-.46h8a.69.69 0 01.69.69z" fill="#fff"/>
                  <path d="M108 91.69H61.09a3.44 3.44 0 00-3.43 3.43V104a3.43 3.43 0 003.43 3.43H108a3.42 3.42 0 003.43-3.43v-8.88a3.43 3.43 0 00-3.43-3.43m.62 12.25a.69.69 0 01-.68.69H61.16a.69.69 0 01-.69-.69v-8.75a.69.69 0 01.69-.69h46.73a.69.69 0 01.68.69z" fill="#c5a45a"/>
                  <path d="M61.61 84.66h10a3.42 3.42 0 003.41-3l2.24-19.15a.7.7 0 01.68-.61H91.1a.68.68 0 01.68.61l2.36 19.16a3.43 3.43 0 003.4 3h9.9a3.43 3.43 0 003.4-3.91L100.07 3.51a3.44 3.44 0 00-3.4-2.95H72.48a3.42 3.42 0 00-3.39 2.95L58.21 80.75a3.43 3.43 0 003.4 3.91M61 81.07L71.82 4a.69.69 0 01.68-.59h24a.67.67 0 01.68.59L108 81.07a.68.68 0 01-.68.78H97.5a.7.7 0 01-.68-.6l-2.47-19.19a3.44 3.44 0 00-3.4-3H78.1a3.44 3.44 0 00-3.41 3l-2.47 19.19a.68.68 0 01-.68.6h-9.86a.69.69 0 01-.68-.78" fill="#fff"/>
                  <path d="M80.24 48.94h8.56a3.44 3.44 0 003.41-3.87l-3.67-28.58a3.43 3.43 0 00-3.41-3h-1.22a3.43 3.43 0 00-3.4 3l-3.67 28.58a3.44 3.44 0 003.4 3.87m-.84-3.58l3.46-28.45a.68.68 0 01.68-.6h2a.68.68 0 01.68.6l3.56 28.44a.69.69 0 01-.68.77h-9a.68.68 0 01-.68-.76" fill="#fff"/>
                  <path d="M276.53.56h-46.86A3.42 3.42 0 00226.24 4v8.89a3.43 3.43 0 003.43 3.43h46.86a3.43 3.43 0 003.47-3.44V4a3.42 3.42 0 00-3.47-3.44m.62 12.25a.69.69 0 01-.69.69h-46.72a.69.69 0 01-.69-.69V4.06a.69.69 0 01.69-.69h46.72a.69.69 0 01.69.69z" fill="#c5a45a"/>
                  <path d="M268.64 26.3a3.42 3.42 0 00-3.39-3h-24.19a3.44 3.44 0 00-3.4 2.95l-10.87 77.24a3.43 3.43 0 003.4 3.91h10a3.43 3.43 0 003.41-3l2.24-19.15a.68.68 0 01.68-.6h13.15a.68.68 0 01.68.6l2.36 19.17a3.42 3.42 0 003.4 3H276a3.43 3.43 0 003.4-3.9zm7.3 78.33h-9.86a.68.68 0 01-.68-.6l-2.47-19.19a3.43 3.43 0 00-3.4-3h-12.86a3.43 3.43 0 00-3.4 3L240.8 104a.69.69 0 01-.68.6h-9.86a.69.69 0 01-.68-.78l10.82-77.08a.69.69 0 01.68-.59h24a.69.69 0 01.68.59l10.82 77.11a.69.69 0 01-.68.78" fill="#fff"/>
                  <path d="M257.11 39.28a3.42 3.42 0 00-3.4-3h-1.22a3.42 3.42 0 00-3.4 3l-3.67 28.57a3.43 3.43 0 003.4 3.87h8.56a3.43 3.43 0 003.4-3.87zm.58 29.63h-9a.69.69 0 01-.68-.77l3.46-28.44a.68.68 0 01.68-.61h2a.68.68 0 01.68.6l3.56 28.45a.69.69 0 01-.68.77M32.35 85.36V68.2c0-5.48-3.66-9.14-9.14-9.14h-5.72a3.44 3.44 0 00-3.43 3.43v28.58a3.43 3.43 0 003.43 3.43h5.72c5.48 0 9.14-3.65 9.14-9.14M16.88 91V62.56a.67.67 0 01.68-.68h5.65a6 6 0 016.32 6.32v17.16a6 6 0 01-6.32 6.33h-5.65a.68.68 0 01-.68-.69" fill="#fff"/>
                  <path d="M46.41 84.24V70.88c0-6.77-2.22-12.37-6-16.42a.66.66 0 010-.92c3.8-4 6-9.65 6-16.42V23.76c0-13.92-9.28-23.2-23.2-23.2H3.43A3.43 3.43 0 000 4v100a3.43 3.43 0 003.43 3.43h19.78c14.06 0 23.2-9.14 23.2-23.2m-43.6 19.7V4.06a.69.69 0 01.69-.69h19.71c12.23 0 20.39 8.16 20.39 20.39v13.36c0 6-1.92 11-5.37 14.55a3.36 3.36 0 000 4.66c3.45 3.55 5.37 8.55 5.37 14.55v13.36c0 12.23-8.16 20.39-20.39 20.39H3.5a.69.69 0 01-.69-.69" fill="#fff"/>
                  <path d="M17.49 48.94h5.72c5.48 0 9.14-3.66 9.14-9.15V22.64c0-5.49-3.66-9.14-9.14-9.14h-5.72a3.43 3.43 0 00-3.43 3.43V45.5a3.44 3.44 0 003.43 3.44M16.88 17a.68.68 0 01.68-.69h5.65a6 6 0 016.32 6.33v17.15a6 6 0 01-6.32 6.33h-5.65a.67.67 0 01-.68-.68z" fill="#fff"/>
                </svg>
                </div>
                <BlockContent blocks={info.body} serializers={{ types: { block: BlockRenderer } }} />
              </div>
            </div>
          </div>
        </footer>
      );
    }
    return <h2>Loading posts...</h2>;
  }
}
