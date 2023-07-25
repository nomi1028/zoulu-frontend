import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../../styles/Home.module.css";
const Faq = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(panel, isExpanded, expanded);
  };
  return (
    <div className="FaqHome" style={{ boxShadow: "none" }}>
      <Accordion
        style={{ borderRadius: "5px ", border: "none", boxShadow: "none" }}
        className={`${expanded === "panel1" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel1" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Wann kann ich eine Massage buchen?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Unsere Experten bieten ihre Behandlungen grundsätzlich von 6 bis 23 Uhr an. Im Buchungskalender siehst du welcher Experte zu deinem ausgewählten Zeitfenster verfügbar ist.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{ borderRadius: "5px ", border: "none", boxShadow: "none" }}
        className={`${expanded === "panel2" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel2" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Was kostet eine Massage zu Hause?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Es kann zu ein und derselben Behandlungen verschiedene Preisangaben geben. Denn wir arbeiten nur mit unabhängigen und zertifizierten Experten zusammen und schreiben unseren Experten daher
            nicht die Preise vor
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ borderRadius: "5px ", border: "none", boxShadow: "none" }}
        className={`${expanded === "panel3" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel3" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Was ist Zoulu?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Zoulu ist dein einfacher, schneller und sicherer Weg, um eine professionelle mobile Massage, Physio- und Beauty- Behandlung zu Hause zu erhalten.
            <br />
            <br />
            Du kannst bequem über unserer Website deine Wunschbehandlung bei einem unserer zertifizierten Experten buchen. Kein Warten auf Verfügbarkeit, keine Barzahlung, kein Stress mit der Suche
            nach dem richtigen Therapeuten oder der Anfahrt zum Spa und zurück.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ borderRadius: "5px ", border: "none", boxShadow: "none" }}
        className={`${expanded === "panel4" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel4" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Muss ich für die Behandlung etwas bereitstellen?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Grundsätzlich bringt dein Experte alles mit, damit du deine Wunschbehandlung unkompliziert zu Hause genießen kannst. Wählst du im Buchungsprozess eine bestimmte Behandlung aus, wird dir
            der konkrete Vorbereitungsablauf beschrieben. Beispielweise solltest du bei einer Massage einen Platz von 2 mal 2 Meter bereitstellen, damit eine Massageliege aufgestellt werden kann.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ borderRadius: "5px ", border: "none", boxShadow: "none" }}
        className={`${expanded === "panel5" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel5" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Gibt es eine Gebühr, wenn ich storniere?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Du kannst bis zu 24 Stunden vor deiner Behandlung stornieren. Danach wird eine Stornierungsgebühr von 80 % des Preises berechnet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Faq;
