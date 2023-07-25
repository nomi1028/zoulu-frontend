import React from "react";
import { Row, Col } from "reactstrap";
const data = [
  {
    index: "2",
    heading: "Datensicherheit",
    subheading: [
      "Wir von Zoulu.de legen großen Wert auf die Sicherheit der personenbezogenen Daten unserer Experten, Kunden und Besucher. Um einen optimalen Schutz zu gewährleisten, setzen wir technische und organisatorische Maßnahmen ein, die den aktuellen Stand der Technik widerspiegeln.",
      "Dazu gehören unter anderem:",
      "Verschlüsselung von Datenübertragungen (z.B. SSL)",
      "Zugriffskontrollen, um unauthorisierten Zugriff auf personenbezogene Daten zu verhindern",
      "Regelmäßige Überprüfung und Aktualisierung unserer Sicherheitsmaßnahmen",
      "Wir bemühen uns stets, die Datensicherheit auf unserer Plattform auf dem neuesten Stand zu halten und eventuelle Sicherheitslücken schnellstmöglich zu schließen. Trotzdem kann ein absoluter Schutz vor unbefugtem Zugriff oder Missbrauch nicht garantiert werden.",
      "Wir empfehlen allen Nutzern, ihre Login-Daten sorgfältig zu verwahren und nicht an Dritte weiterzugeben.",
    ],
  },
  {
    index: "3",
    heading: "Weitergabe von Daten an Partnerunternehmen und Dritte",
    subheading: [
      "Zoulu.de gibt keine personenbezogenen Daten von Experten oder Kunden an Dritte weiter, es sei denn, dies ist zur Erfüllung einer vertraglichen Verpflichtung oder aufgrund gesetzlicher Vorschriften erforderlich.",
      "In bestimmten Fällen kann es erforderlich sein, dass Zoulu.de Daten an Partnerunternehmen weitergibt, um eine reibungslose Durchführung von Dienstleistungen sicherzustellen. In diesen Fällen werden nur die erforderlichen Daten an die Partnerunternehmen weitergegeben und nur für den angegebenen Zweck verwendet.",
      "Zoulu.de stellt sicher, dass alle Partnerunternehmen die gleichen hohen Datenschutzstandards einhalten, die Zoulu.de selbst anwendet. Sollte es zu einer Weitergabe von Daten an Dritte kommen, wird Zoulu.de dies vorab mit den betroffenen Experten und Kunden besprechen und ihnen die Möglichkeit geben, ihre Zustimmung zu erteilen oder die Weitergabe zu verweigern.",
    ],
  },
  {
    index: "4",
    heading: "Rechte der Nutzer",
    subheading: [
      "Zoulu.de stellt sicher, dass alle Partnerunternehmen die gleichen hohen Datenschutzstandards einhalten, die Zoulu.de selbst anwendet. Sollte es zu einer Weitergabe von Daten an Dritte kommen, wird Zoulu.de dies vorab mit den betroffenen Experten und Kunden besprechen und ihnen die Möglichkeit geben, ihre Zustimmung zu erteilen oder die Weitergabe zu verweigern.",
      "Zudem haben Sie das Recht, eine Kopie Ihrer persönlichen Daten in einem maschinenlesbaren Format zu erhalten. Diese Kopie können Sie an einen anderen Datenverantwortlichen weitergeben, sofern dies technisch möglich ist.",
      "Sollten Sie Fragen oder Bedenken bezüglich Ihrer persönlichen Daten haben, kontaktieren Sie uns bitte über unsere Kontaktinformationen auf unserer Website. Wir werden uns bemühen, Ihnen innerhalb einer angemessenen Frist zu antworten.",
      "Des Weiteren haben Sie das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen, sofern Sie der Meinung sind, dass die Verarbeitung Ihrer persönlichen Daten gegen geltende Datenschutzgesetze verstößt.",
    ],
  },
  {
    index: "5",
    heading: "Weitergabe von Daten an Partnerunternehmen und Dritte",
    subheading: [
      "Des Weiteren haben Sie das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen, sofern Sie der Meinung sind, dass die Verarbeitung Ihrer persönlichen Daten gegen geltende Datenschutzgesetze verstößt.",
      "Des Weiteren haben Sie das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen, sofern Sie der Meinung sind, dass die Verarbeitung Ihrer persönlichen Daten gegen geltende Datenschutzgesetze verstößt.",
      "Zoulu.de stellt sicher, dass alle Partnerunternehmen die gleichen hohen Datenschutzstandards einhalten, die Zoulu.de selbst anwendet. Sollte es zu einer Weitergabe von Daten an Dritte kommen, wird Zoulu.de dies vorab mit den betroffenen Experten und Kunden besprechen und ihnen die Möglichkeit geben, ihre Zustimmung zu erteilen oder die Weitergabe zu verweigern.",
    ],
  },
  {
    index: "6",
    heading: "Cookies",
    subheading: [
      "Zoulu.de verwendet Cookies, um Ihnen eine bessere Nutzererfahrung zu ermöglichen. Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie unsere Website besuchen. Diese Cookies ermöglichen es uns, Informationen über Ihre Präferenzen und Ihre Nutzung unserer Website zu speichern, um die Funktionalität und die Benutzerfreundlichkeit zu verbessern.",
      "Sie können die Verwendung von Cookies jederzeit über Ihre Browser-Einstellungen deaktivieren. Bitte beachten Sie, dass durch die Deaktivierung von Cookies einige Funktionen unserer Website möglicherweise nicht mehr vollständig zur Verfügung stehen.",
      "Zoulu.de verwendet sowohl persistente Cookies, die auf Ihrem Gerät gespeichert bleiben, bis sie ablaufen oder gelöscht werden, als auch Sitzungscookies, die beim Schließen Ihres Browsers gelöscht werden. Die Verwendung von Cookies erfolgt in Übereinstimmung mit den geltenden Datenschutzgesetzen.",
    ],
  },
  {
    index: "7",
    heading: "Einbindung von Diensten und Inhalten Dritter",
    subHeadings: [
      {
        subindex: "7.1",
        sub_heading: "Google Analytics",
        subparagraph: [
          "Zoulu.de nutzt Google Analytics, einen Webanalysedienst von Google Inc. („Google“), zur Erfassung und Auswertung von Daten über das Nutzerverhalten auf unserer Website. Dabei werden Cookies verwendet, um Informationen über das Nutzerverhalten, wie beispielsweise die Anzahl der Besucher, die Verweildauer auf der Website und die aufgerufenen Seiten, zu sammeln. Die gesammelten Informationen werden an Google übertragen und auf Googles Servern gespeichert. Google wird diese Informationen verwenden, um die Nutzung der Website durch die Benutzer auszuwerten, um Reports über die Website-Aktivitäten zu erstellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen bereitzustellen. Google kann diese Informationen auch an Dritte übertragen, sofern dies gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google in Verbindung bringen. Weitere Informationen zur Datennutzung durch Google finden Sie in der Datenschutzerklärung von Google unter ",
        ],
        link: "https://policies.google.com/privacy .",
      },
      {
        subindex: "7.2",
        sub_heading: "Google AdWords",

        subparagraph: [
          "Zoulu.de verwendet Google AdWords, ein Online-Werbeprogramm von Google, um gezielt Werbung für unsere Dienstleistungen zu schalten. Durch die Verwendung von Google AdWords können wir Ihnen angepasste Werbung auf anderen Websites zeigen, wenn Sie das Internet durchsuchen.",
          "Google AdWords verwendet Cookies, um Informationen über Ihre Interaktionen mit unserer Website und Ihre Surfgewohnheiten zu sammeln. Diese Informationen werden verwendet, um gezielt Werbung für unsere Dienstleistungen zu schalten, die für Sie von Interesse sein könnten.",
          "Sie können die Verwendung von Cookies jederzeit über Ihre Browser-Einstellungen deaktivieren. Bitte beachten Sie, dass durch die Deaktivierung von Cookies einige Funktionen unserer Website möglicherweise nicht mehr vollständig zur Verfügung stehen.",
          "Die Verwendung von Google AdWords erfolgt in Übereinstimmung mit den geltenden Datenschutzgesetzen und den Datenschutzrichtlinien von Google.",
        ],
      },
      {
        subindex: "7.3",
        sub_heading: "Facebook",

        subparagraph: [
          "Zoulu.de verwendet auch Facebook, eine Online-Plattform zur Verbreitung von Inhalten und Werbung. Durch die Verwendung von Facebook können wir gezielt Werbung für unsere Dienstleistungen auf der Facebook-Plattform schalten.",
          "Facebook verwendet Cookies und andere Technologien, um Informationen über Ihre Interaktionen mit unserer Website und Ihre Surfgewohnheiten zu sammeln. Diese Informationen werden verwendet, um gezielt Werbung für unsere Dienstleistungen zu schalten, die für Sie von Interesse sein könnten.",
          "Sie können die Verwendung von Cookies jederzeit über Ihre Browser-Einstellungen deaktivieren. Bitte beachten Sie, dass durch die Deaktivierung von Cookies einige Funktionen unserer Website möglicherweise nicht mehr vollständig zur Verfügung stehen.",
          "Die Verwendung von Facebook erfolgt in Übereinstimmung mit den geltenden Datenschutzgesetzen und den Datenschutzrichtlinien von Facebook.",
        ],
      },
    ],
  },
  {
    index: "8",
    heading: "Änderungen der Datenschutzerklärung",
    subheading: [
      "Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern, um sicherzustellen, dass sie den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Dienstleistungen zu berücksichtigen. Alle Änderungen werden auf dieser Seite veröffentlicht und wir empfehlen Ihnen, diese regelmäßig zu überprüfen, um sicherzustellen, dass Sie über die aktuellen Bedingungen informiert sind.",
      "Wenn wesentliche Änderungen an der Datenschutzerklärung vorgenommen werden, werden wir Sie auf angemessene Weise darüber informieren, beispielsweise durch eine Benachrichtigung auf unserer Website oder durch eine E-Mail an die von Ihnen bereitgestellte Adresse. Die fortgesetzte Nutzung unserer Dienstleistungen nach Veröffentlichung solcher Änderungen gilt als Ihre Zustimmung zu den geänderten Bedingungen.",
    ],
  },
];
const Treatments = (props) => {
  return (
    <>
      <div className="container-fluid">
        <Row className="marginLeftRight mt-4">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="treatment-accordian">
            <div>
              <h4 style={{ fontFamily: "PlusJakartaSans-medium" }}>Datenschutzerklärung für Zoulu.de</h4>
              <p style={{ fontFamily: "PlusJakartaSans-medium" }}>
                Zoulu.de ist eine Plattform, die es Kunden ermöglicht, mobile Dienstleistungen im Wellness- und Beauty-Bereich zu buchen. Diese Dienstleistungen werden von Experten erbracht, die sich
                auf der Plattform registrieren können.
              </p>

              <h5>
                <span className="privacyHeading">1</span>
                Erhebung, Verarbeitung und Nutzung personenbezogener Daten von Experten
              </h5>
              <p style={{ fontFamily: "PlusJakartaSans-medium" }}>
                <span className="privacyHeading">1.1</span>
                Daten von ExpertenZoulu.de erhebt, verarbeitet und nutzt die personenbezogenen Daten von Experten, die sich auf unserer Plattform registrieren, um ihre Dienstleistungen anzubieten.
                Diese Daten beinhalten Name, Adresse, Email-Adresse, Telefonnummer, Qualifikationsnachweise und weitere relevante Informationen. Diese Daten werden verwendet, um die Verifizierung der
                Experten sicherzustellen, um sicherzustellen, dass die angebotenen Dienstleistungen qualitativ hochwertig sind, und um den Kunden eine Übersicht über die angebotenen Dienstleistungen
                zu bieten.
              </p>
              <h5>
                {" "}
                <span className="privacyHeading">1.2</span>Daten von Kunden
              </h5>
              <p style={{ fontFamily: "PlusJakartaSans-medium" }}>
                Wenn Kunden eine Dienstleistung über Zoulu.de buchen, erheben wir personenbezogene Daten wie Name, Adresse, Email-Adresse und Telefonnummer. Diese Daten werden verwendet, um die
                Buchung abzuschließen und den Experten die Möglichkeit zu geben, mit dem Kunden Kontakt aufzunehmen, um die Details der Dienstleistung zu besprechen. Die Daten werden auch verwendet,
                um die Zahlung abzuschließen und um den Kunden über den Status der Buchung zu informieren.
              </p>
              <h5>
                {" "}
                <span className="privacyHeading">1.3</span>Daten von Besuchern
              </h5>
              <p style={{ fontFamily: "PlusJakartaSans-medium" }}>
                Zoulu.de erhebt auch Daten von Besuchern, die die Webseite ohne Registrierung nutzen. Hierzu gehören Informationen wie IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten
                und verwendeter Browser. Diese Daten werden in sogenannten Server-Logfiles gespeichert. Die Verarbeitung dieser Daten erfolgt zur Gewährleistung eines reibungslosen Betriebs der
                Webseite sowie zur Verbesserung unseres Angebots. Eine Verknüpfung dieser Daten mit anderen Datenquellen oder eine Weitergabe an Dritte findet nicht statt.
              </p>
              {data?.map((value, key) => {
                return (
                  <>
                    <h4 style={{ fontFamily: "PlusJakartaSans-medium" }}>
                      <span className="privacyHeading">{value?.index}</span>
                      {value?.heading}
                    </h4>

                    {value?.subheading &&
                      value?.subheading?.map((subheadings, index) => {
                        return (
                          <>
                            <p style={{ fontFamily: "PlusJakartaSans-medium" }}>{subheadings}</p>
                          </>
                        );
                      })}
                    {value?.subHeadings &&
                      value?.subHeadings?.map((subHeading, index) => {
                        return (
                          <>
                            <h5 style={{ fontFamily: "PlusJakartaSans-medium" }}>
                              <span className="privacyHeading">{subHeading?.subindex}</span>
                              {subHeading?.sub_heading}
                            </h5>
                            {subHeading?.subparagraph?.map((subparagraph) => {
                              return (
                                <>
                                  <p style={{ fontFamily: "PlusJakartaSans-medium" }}>
                                    {subparagraph}
                                    <span>{subHeading?.link}</span>
                                  </p>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                  </>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
      {/* <Contact />
      <Footer /> */}
    </>
  );
};
export default Treatments;
