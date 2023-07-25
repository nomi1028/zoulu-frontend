import React from "react";
import { Row, Col } from "reactstrap";
const data = [
  {
    heading: "Allgemeine Geschäftsbedingungen",
    subheading: [
      " 1.	Einführung und Zweck: Diese Allgemeinen Geschäftsbedingungen (im Folgenden AGB) regeln die Nutzung des Online-Marktplatzes Zoulu (im Folgenden Plattform) und die Geschäftsbeziehung zwischen Zoulu und den Nutzern der Plattform. Mit der Nutzung der Plattform erklären Sie sich mit diesen AGB einverstanden.",
      "  2.	Nutzung der Plattform: Die Plattform ermöglicht es Experten, ihre Dienstleistungen (Massagen, Physiotherapie, Friseurdienstleistungen, Kosmetik) auf der Plattform anzubieten und von Kunden gebucht zu werden. Zoulu stellt lediglich die Plattform zur Verfügung und ist in keiner Weise an den Vertragsverhältnissen zwischen Experten und Kunden beteiligt.",
      " 3.	Registrierung: Um die Plattform nutzen zu können, ist eine Registrierung erforderlich. Sie versichern mit der Registrierung, dass die von Ihnen angegebenen Daten zutreffend und vollständig sind. Jeder Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor dem Zugriff Dritter zu schützen.",
      " 4.	Verpflichtungen der Experten: Die Experten sind verpflichtet, ihre Dienstleistungen entsprechend der geltenden Gesetze und Vorschriften anzubieten und durchzuführen. Sie sind für die Richtigkeit und Vollständigkeit der von ihnen auf der Plattform eingestellten Informationen verantwortlich.",
      " 5.	Verpflichtungen der Kunden: Die Kunden sind verpflichtet, die gebuchten Dienstleistungen in angemessener Weise zu nutzen und eventuelle Schäden an Eigentum des Experten zu ersetzen.",
      "6.	Zahlung: Die Bezahlung der Dienstleistungen erfolgt über die Plattform per Stripe oder PayPal. Zoulu behält sich das Recht vor, die Zahlungsbedingungen jeder.",
    ],
  },
  {
    heading:
      "zeit zu ändern. Der Experte erhält den vereinbarten Preis für die Dienstleistung abzüglich der Provision von Zoulu in Höhe von derzeit 20%. Zoulu behält sich das Recht vor, die Höhe der Provision jederzeit anzupassen. ",
    subheading: [
      " 7.	Haftung: Zoulu haftet nicht für Schäden, die durch die Nutzung der Plattform oder durch die Erbringung der Dienstleistungen durch die Experten entstehen. Jeder Nutzer haftet für Schäden, die er durch seine Nutzung der Plattform verursacht.",
      "8.	Änderungen der AGB: Zoulu behält sich das Recht vor, diese AGB jederzeit zu ändern. Die jeweils aktuelle Fassung der AGB ist auf der Plattform verfügbar.",
      "9.	Salvatorische Klausel: Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmungen treten die gesetzlichen Vorschriften.",
    ],
  },
];
const termsConditions = (props) => {
  return (
    <>
      <div className="container-fluid">
        <Row className="marginLeftRight mt-4">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="treatment-accordian">
            <div>
              {data?.map((value, key) => {
                return (
                  <>
                    <h4 style={{ fontFamily: "PlusJakartaSans-medium" }}>{value?.heading}</h4>
                    {value?.subheading &&
                      value?.subheading?.map((subheadings, index) => {
                        return (
                          <>
                            <p style={{ fontFamily: "PlusJakartaSans-medium" }}>{subheadings}</p>
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
export default termsConditions;
