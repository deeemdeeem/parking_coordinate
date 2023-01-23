import parking from "../data/parkingData";

const FindSlot = (props, plate, size) => {
  let data = null;
  let goalP2 = { x: null, y: null };

  // car size condition
  switch (size) {
    case "SP":
      data = parking.filter((i) => i.occupied == false);
      break;
    case "MP":
      data = parking.filter(
        (i) => (i.occupied == false && i.size == "m") || i.size == "l"
      );
      break;
    case "LP":
      data = parking.filter((i) => i.occupied == false && i.size == size);
      break;
    default:
      goalP2 = { x: 3, y: 3 };
      break;
  }

  
  // Entry point
  switch (props) {
    case "PE1":
      goalP2 = { x: 2, y: 1 };
      break;
    case "PE2":
      goalP2 = { x: 3, y: 3 };
      break;
    case "PE3":
      goalP2 = { x: 2, y: 5 };
      break;
    default:
      goalP2 = { x: 3, y: 3 };
      break;
  }

  // Assign numeric value per slot
  // The neighboring coordinate of goal coordinate will have the lowest value
  const indexArr = data.map(
    (item) => Math.abs(item.x - goalP2.x) + Math.abs(item.y - goalP2.y)
  );

  // sort the array to nearest value
  const min = Math.min(...indexArr);
  const closest = data[indexArr.indexOf(min)];

  if (data != 0) {
    closest.occupied = true;
    closest.plate = plate;
  }
};

export default FindSlot;
