import { useLocation } from "react-router";
import { MAIL_SENT_TEXTS } from "../texts/MailSentTexts";

function MailSentPage() {

    const location = useLocation();


    return (
        <div className="emailSent-container">
            <h2>{MAIL_SENT_TEXTS["verification.title"]}</h2>
            <p>{MAIL_SENT_TEXTS["verification.text1"]}{location.state.email}.</p>
            <p>{MAIL_SENT_TEXTS["verification.text2"]}</p>
        </div>
    )

}

export default MailSentPage;