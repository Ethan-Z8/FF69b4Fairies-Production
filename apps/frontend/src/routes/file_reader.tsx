import React, { useState } from "react";
//import {HTMLInputElement} from "happy-dom";
import axios from "axios";
import { BackButton } from "../components/BackButton.tsx";
//import {HTMLInputElement} from "happy-dom";

interface Form {
  nodes: File | null;
  edges: File | null;
}
function FileReader() {
  const [fileData, setFileData] = useState<Form>({ nodes: null, edges: null });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string,
  ) => {
    if (event.target.files != null) {
      const selectedFile = event.target.files[0];
      if (fileType == "nodes") {
        setFileData({ ...fileData, nodes: selectedFile });
      }
      if (fileType == "edges") {
        setFileData({ ...fileData, edges: selectedFile });
      }
    }
  };
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fileData.nodes || !fileData.edges) {
      return;
    }
    const sentForm = new FormData();
    sentForm.append("nodes", fileData.nodes);
    sentForm.append("edges", fileData.edges);
    try {
      const res = await axios.post("/api/map/import", fileData);
      console.log(res);
    } catch (e) {
      console.error("LOL", e);
    }
    console.log("submitted");
  };

  return (
    <div>
      <BackButton />
      <form onSubmit={handleFormSubmit}>
        <div className="file_reader">
          <label>Nodes file:</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileChange(e, "nodes")}
          />
          <label>Edges file:</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileChange(e, "edges")}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FileReader;
