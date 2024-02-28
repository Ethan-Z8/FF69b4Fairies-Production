import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import "../styling/OffCanvasInformation.css";

import BathroomIcon from "../assets/IconsForHospital/bathroomicon.png";
import ATMIcon from "../assets/IconsForHospital/AtmIcon.png";
import BusIcon from "../assets/IconsForHospital/Bus Icon.png";
import CafeIcon from "../assets/IconsForHospital/cafeIcon.png";
import DiningIcon from "../assets/IconsForHospital/diningIcon.png";
import ElevatorIcon from "../assets/IconsForHospital/elevatorIcon.png";
import EmergencyIcon from "../assets/IconsForHospital/EmergencyIcon.png";
import Valet from "../assets/IconsForHospital/valet.png";
import Escalator from "../assets/IconsForHospital/escalator.png";
import InfoDesk from "../assets/IconsForHospital/InfoIcon.png";
import MensRestroom from "../assets/IconsForHospital/MensRestroom.png";
import ParkingIcon from "../assets/IconsForHospital/parkingIcon.png";
import VendingMachine from "../assets/IconsForHospital/Vendingmachine.png";
import WaitingRoom from "../assets/IconsForHospital/WaitingRoom.png";
import WomensRestroom from "../assets/IconsForHospital/womensRestroom.png";
import Entrance from "../assets/IconsForHospital/Entrance.png";

function InfoOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className={"InfoIconForHelp"}
      style={{
        position: "absolute",
        bottom: 15,
        left: 15,
        margin: "-10px",
        padding: 0,
        zIndex: 100,
      }}
    >
      <IconButton onClick={handleShow}>
        <InfoIcon
          sx={{
            fontSize: "60px",
          }}
        />
      </IconButton>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: "50px" }}>Key</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              marginTop: "-10%",
              "& > .ListItemForOffCanvas:hover::before": {
                width: 0,
              },
            }}
          >
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <div
                  className="nodeForInfo"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#009ca6",
                    borderRadius: "50%",
                    zIndex: 24,
                    borderColor: "black",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    marginLeft: 6,
                  }}
                ></div>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Node for Location"
                secondary="This helps with Navigation and knowing where things are"
              />
            </ListItem>

            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <div>
                  <img
                    className={"arrowForInfo"}
                    src={"https://static.thenounproject.com/png/634840-200.png"}
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  ></img>
                  <img
                    className={"arrowForInfo"}
                    src={"https://static.thenounproject.com/png/634840-200.png"}
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  ></img>
                </div>
              </ListItemAvatar>
              <ListItemText
                style={{
                  margin: "15px",
                }}
                primary="Pathing"
                secondary="This points you in the direction that you need to go"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"bathroom Icon"}
                  src={BathroomIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Bathroom"
                secondary="Unisex Bathroom"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Mens Icon"}
                  src={MensRestroom}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Men's Restroom"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Womens Icon"}
                  src={WomensRestroom}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Women's Restroom"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Waiting Icon"}
                  src={WaitingRoom}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Waiting Room"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Info Icon"}
                  src={InfoDesk}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Info Desk"
                secondary={"For any questions or help"}
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Escalator Icon"}
                  src={Escalator}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Escalator"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"ATM Icon"}
                  src={ATMIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="ATM"
                secondary="ATM for cash"
              />
            </ListItem>

            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Cafe Icon"}
                  src={CafeIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Cafes"
                secondary="Cafe timings vary based on location"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Dining Icon"}
                  src={DiningIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Dining"
                secondary="Main Dining open from 6:30am - 6:30pm, Monday - Friday"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Vending Icon"}
                  src={VendingMachine}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Vending Machine"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Elevator Icon"}
                  src={ElevatorIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Elevators"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Bus Icon"}
                  src={BusIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Bus"
                secondary="For Transportation by Bus"
              />
            </ListItem>

            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Valet Icon"}
                  src={Valet}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Valet Parking"
              />
            </ListItem>

            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Parking Icon"}
                  src={ParkingIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="Parking for Guests"
              />
            </ListItem>

            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Entrance Icon"}
                  src={Entrance}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  marginLeft: "15px",
                }}
                primary="Entrances"
              />
            </ListItem>
            <ListItem className={"ListItemForOffCanvas"}>
              <ListItemAvatar>
                <img
                  className={"infoIconForInfo"}
                  alt={"Emergency Icon"}
                  src={EmergencyIcon}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "15px",
                }}
                primary="EMERGENCY"
              />
            </ListItem>
          </List>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default InfoOffCanvas;
