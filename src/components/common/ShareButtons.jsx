import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';

import './ShareButtons.scss'

function ShareButtons({ url, titulo, resumen }) {
    return (
        <div className="share-buttons">
            <EmailShareButton url={url} subject={titulo} body={resumen}>
                <EmailIcon round size={32} />
            </EmailShareButton>
            <FacebookShareButton url={url} quote={`${titulo} - ${resumen}`}>
                <FacebookIcon round size={32} />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={titulo}>
                <TwitterIcon round size={32} />
            </TwitterShareButton>
            <LinkedinShareButton
                url={url}
                title={titulo}
                summary={resumen}
                source={'El Último & Me Voy'}
            >
                <LinkedinIcon round size={32} />
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={titulo}>
                <WhatsappIcon round size={32} />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={titulo} >
                <TelegramIcon round size={32} />
            </TelegramShareButton>
        </div>
    );
}

export default ShareButtons;
