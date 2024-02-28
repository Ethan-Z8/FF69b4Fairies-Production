import { Paper } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
//import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

//TODO: Need to make this work properly with the create
export function ImportAndExportDataPage() {
  const [importErr, setImportErr] = useState<boolean>(false);
  const [exportErr, setExportErr] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState(false);
  function handleImport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const edgesInput = target.querySelector("#edgesInput") as HTMLInputElement;
    const nodesInput = target.querySelector("#nodesInput") as HTMLInputElement;
    const formData = new FormData();
    if (edgesInput.files) {
      formData.append("edges", edgesInput.files![0]);
    }
    if (nodesInput.files) {
      formData.append("nodes", nodesInput.files![0]);
    }

    axios
      .post("/api/map/import", formData, {
        headers: {
          "Content-Type": "multipart/form",
        },
      })
      .then(() => {
        setImportSuccess(true);
        setImportErr(false);
      })
      .catch(() => {
        setImportErr(true);
        setImportSuccess(false);
      });
  }

  async function handleExport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res: AxiosResponse = await axios.get("/api/map/export", {
        responseType: "blob",
      });
      // error if content type is wrong
      if (res.headers["content-type"] !== "application/zip") {
        throw new Error("Did not receive valid data");
      }

      // Somehow this is the only way to force axios to start a file download
      // Create an anchor tag with the url to the data, then click that link
      const url: string = window.URL.createObjectURL(new Blob([res.data]));
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "map_data.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportErr(false);
    } catch (e) {
      console.log((e as Error).message);
      setExportErr(true);
    }
  }

  return (
    <Paper
      elevation={24}
      sx={{
        my: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
        border: "8px solid #012D5A", // Add border styling here
        borderRadius: "9px", // Add border-radius for rounded corners
        margin: "1rem",
      }}
    >
      <Stack gap={3}>
        <Form
          className="m-auto w-75 mt-5"
          onSubmit={handleImport}
          encType="multipart/form-data"
        >
          <Form.Group as={Row}>
            <h4>Import Map Data</h4>
            <Form.Label column sm={2} className="mb-3">
              Edges CSV
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" id="edgesInput" accept=".csv" />
            </Col>
            <Form.Label column sm={2}>
              Nodes CSV
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" id="nodesInput" accept=".csv" />
            </Col>
            <Col>
              <Button
                type="submit"
                className="mt-3 w-100"
                variant="outlined"
                endIcon={<FileUploadOutlinedIcon />}
              >
                Import
              </Button>
            </Col>
            <Form.Text
              className="text-danger"
              style={{ visibility: importErr ? "visible" : "hidden" }}
            >
              Error Importing Data
            </Form.Text>
            <Form.Text
              className="text-success"
              style={{ visibility: importSuccess ? "visible" : "hidden" }}
            >
              Successfully imported Data!
            </Form.Text>
          </Form.Group>
        </Form>

        <Form className="m-auto w-75 mt-5" onSubmit={handleExport}>
          <Form.Group controlId="exportCsv" as={Stack}>
            <h4>Export Map Data as CSV</h4>
            <Button
              type="submit"
              variant="outlined"
              endIcon={<FileDownloadIcon />}
            >
              Download edges and nodes
            </Button>
          </Form.Group>
          <Form.Text
            className="text-danger"
            style={{ visibility: exportErr ? "visible" : "hidden" }}
          >
            Error Exporting Data
          </Form.Text>
        </Form>
      </Stack>
    </Paper>
  );
}
