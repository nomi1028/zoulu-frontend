import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function BasicDatePicker() {
  return (
    <div className="d-flex flex-wrap">
      <div class="sd-container mt-1">
        <input class="sd firstInputWidth" type="date" name="selected_date" placeholder="Date" />
        <span class="open-button">
          <button type="button">
            <KeyboardArrowDownIcon />
          </button>
        </span>
      </div>
      <div class="sd-container mt-1">
        <input class="sd secondInputWidth" type="date" name="selected_date" />
        <span class="open-button">
          <button type="button">
            <KeyboardArrowDownIcon />
          </button>
        </span>
      </div>
      <div class="sd-container mt-1">
        <input class="sd thirdInputWidth" type="date" name="selected_date" />
        <span class="open-button">
          <button type="button">
            <KeyboardArrowDownIcon />
          </button>
        </span>
      </div>
    </div>
  );
}
