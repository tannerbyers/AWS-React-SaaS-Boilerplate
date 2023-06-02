exports.handler = async function (event) {
  // This is the PoC implementation of a parser for X12.
  // It does recognize loops due to the lack of an X12 imp guide currently.
  // This is not fit for production use.
  function parseX12toJsonWithoutLoops(ediData) {
    if (
      ediData === undefined ||
      ediData === "" ||
      typeof ediData !== "string"
    ) {
      console.error(`The EDI data provided is empty or not a string`);
    }

    ediData = ediData.replace(/(\r\n|\n|\r)/gm, "");

    console.log(ediData);
    if (ediData.substring(0, 3) === "ISA") {
      var elementSeparator = ediData[3];
      var subElementSeparator = ediData[104];
      var segmentSeparator = ediData[105];
    } else {
      // If file does not have ISA, we cannot determine separators from file and will default to below values
      var { segmentSeparator, elementSeparator, subElementSeparator } = {
        segmentSeparator: "~",
        elementSeparator: "*",
        subElementSeparator: ":",
      };
    }

    const segments = ediData.split(segmentSeparator);

    const jsonOutput = {};
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].trim();

      // skip empty lines at beginning and end of file
      if (segment == "") {
        continue;
      }

      const elements = segment.split(elementSeparator);
      const segmentName = elements[0].toString();
      jsonOutput[segmentName] = {};
      for (let j = 1; j < elements.length; j++) {
        const element = elements[j];
        let elementKey = "";
        if (j < 10) {
          // Add leading zero to better represent the X12 Imp guides
          elementKey = "0" + j.toString();
        } else {
          elementKey = j;
        }
        jsonOutput[segmentName][elementKey] = {};
        if (element.includes(":")) {
          const subElements = element.split(subElementSeparator);
          for (let k = 0; k < subElements.length; k++) {
            const subElement = subElements[k];
            let subElementKey = "";
            if (k < 10) {
              // Add leading zero to better represent the standard
              subElementKey = "0" + (k + 1).toString();
            } else {
              subElementKey = (k + 1).toString();
            }
            jsonOutput[segmentName][elementKey][subElementKey] = subElement;
          }
        } else {
          jsonOutput[segmentName][elementKey] = element;
        }
      }
    }

    const finalFormat = {};
    for (const segment in jsonOutput) {
      for (const currentElement in jsonOutput[segment]) {
        const element = jsonOutput[segment][currentElement];
        if (typeof element !== "object") {
          const newKey = [segment, currentElement].join(":");
          finalFormat[newKey] = element;
        } else {
          // handle subelements
          for (const currentSubElement in jsonOutput[segment][currentElement]) {
            const newKey = [segment, currentElement, currentSubElement].join(
              ":"
            );
            finalFormat[newKey] = element[currentSubElement];
          }
        }
      }
    }

    console.log(finalFormat);
    return finalFormat;
  }

  const ediData = event.body;
  const parsedX12 = parseX12toJsonWithoutLoops(ediData);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsedX12),
  };
};
