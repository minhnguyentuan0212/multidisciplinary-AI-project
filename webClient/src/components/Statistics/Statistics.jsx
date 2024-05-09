import Humidity from "./Humidity";
import Temperature from "./Temperature";

function Statistics(data) {
  // return (<></>)
  if (data.data == []) return <></>;
  const signal = data.data;
  if (signal.length == 0) return <></>;
  let temperature = null;
  let humidity = null;
  for (var idx in signal) {
    if (signal[idx].key.includes("humid")) humidity = signal[idx].data;
    else temperature = signal[idx].data;
  }
  return (
    <>
      <div className="row chivo-reg mb-3 ms-2 mt-2">Statistics</div>
      <div className="row ms-2">
        {humidity ? (
          <div className="col-6">
            <Humidity data={humidity}></Humidity>
          </div>
        ) : (
          <></>
        )}
        {temperature ? (
          <div className="col-6">
            <Temperature data={temperature}></Temperature>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default Statistics;
