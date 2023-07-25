import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../styles/Home.module.css";
const Faq = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div style={{ boxShadow: "none" }} className={"active1 mt-5"}>
      <Accordion
        style={{
          borderRadius: "5px ",
          border: "none",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
        className={`${expanded === "panel1" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel1" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Warum sollte ich Zoulu beitreten?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Durch die Registrierung bei Zoulu kannst du deine Dienstleistungen auf unserer Plattform präsentieren und von potenziellen Kunden gefunden werden. Zoulu erleichtert es dir auch, deine
            Buchungen zu verwalten und deine Verfügbarkeit anzuzeigen. Es ermöglicht dir auch, dein Einkommen zu erhöhen und deine Arbeit flexibler zu gestalten.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          borderRadius: "5px ",
          border: "none",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
        className={`${expanded === "panel2" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel2" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Was verdiene ich mit Zoulu
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Das hängt davon ab, welche Dienstleistungen du anbietest, wie häufig du diese anbietest und zu welchen Preisen. Als Experte bei Zoulu legst die Preise selbst fest. Du verdienst also das,
            was du durch deine Dienstleistungen einnehmen kannst und die Einnahmen können variieren. Zoulu unterstützt dich dabei, deine Dienstleistungen zu vermarkten und potenzielle Kunden zu
            erreichen, um dein Einkommen zu erhöhen.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          borderRadius: "5px ",
          border: "none",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
        className={`${expanded === "panel3" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel3" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Wann erhalte ich mein geld
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Als Experte auf der Zoulu erhältst du dein Geld wöchentlich abgerechnet. Zoulu wird jede Woche alle Buchungen, die in der vorherigen Woche stattgefunden haben, abrechnen und das Geld, das
            du verdient hast, minus die Provision von 15% an dich auszahlen. So hast du die Möglichkeit regelmäßig über deine Einnahmen informiert zu sein und diese auch in kurzen Abständen zu
            erhalten.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          borderRadius: "5px ",
          border: "none",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
        className={`${expanded === "panel4" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel4" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            kann ich mit zoulu nebenbei geld verdienen?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            Ja, es ist möglich nebenbei Geld zu verdienen. Als mobiler Therapeut kannst du deine Dienstleistungen auf der Plattform anbieten und diese flexibel mit deinem Hauptjob kombinieren. Es
            hängt davon ab, wie viel Zeit und Energie du in deine Tätigkeit als Therapeut auf Zoulu investieren möchtest. Du kannst deine Verfügbarkeit selbst bestimmen und deine Dienstleistungen nur
            zu den Zeiten anbieten, zu denen es für dich passt.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{
          borderRadius: "5px ",
          border: "none",
          boxShadow: "none",
          background: "#F9F9F9",
        }}
        className={`${expanded === "panel5" ? "css-1elwnq4-MuiPaper-root-MuiAccordion-root active" : "css-1elwnq4-MuiPaper-root-MuiAccordion-root"} mt-3`}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "#000" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }} sx={{ width: "100%", flexShrink: 0 }} className={expanded === "panel5" ? `${styles.UnActiveClass}` : `${styles.ActiveClass}`}>
            Benutze ich mein eigenes Equipment
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ fontFamily: "PlusJakartaSans-medium" }}>
            {" "}
            Ja, als Therapeut bei Zoulu wird erwartet dass du dein eigenes Equipment benutzt. Für detaillierte Informationen und eventuelle Ausnahmen, empfehlen wir dir, dich an den Kundensupport von
            Zoulu zu wenden.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Faq;
