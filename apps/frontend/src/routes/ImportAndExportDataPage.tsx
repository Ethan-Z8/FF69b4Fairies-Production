import axios, { AxiosResponse } from "axios";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormEvent, useState } from "react";

//TODO: Need to make this work properly with the create
export function ImportAndExportDataPage() {
  const [importErr, setImportErr] = useState<boolean>(false);
  const [exportErr, setExportErr] = useState<boolean>(false);

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
      .then((res) => {
        console.log(res);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setImportErr(true);
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
    <Stack gap={3}>
      <Button className="m-auto w-50 mt-5" href="/">
        Back to Home Page
      </Button>

      <Form
        className="m-auto w-50 mt-5"
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
            <Button type="submit" className="mt-3 w-100">
              Import
            </Button>
          </Col>
          <Form.Text
            className="text-danger"
            style={{ visibility: importErr ? "visible" : "hidden" }}
          >
            Error Importing Data
          </Form.Text>
        </Form.Group>
      </Form>

      <Form className="m-auto w-50 mt-5" onSubmit={handleExport}>
        <Form.Group controlId="exportCsv" as={Stack}>
          <h4>Export Map Data as CSV</h4>
          <Button type="submit">Export</Button>
        </Form.Group>
        <Form.Text
          className="text-danger"
          style={{ visibility: exportErr ? "visible" : "hidden" }}
        >
          Error Exporting Data
        </Form.Text>
      </Form>
    </Stack>
  );
}
