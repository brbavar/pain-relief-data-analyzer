// import ReactSlider from 'react-slider';
import { useState } from 'react';

const ReportPainLevels = () => {
  const [painLevel, setPainLevel] = useState(0);

  return (
    <body>
      {/* <ReactSlider /> */}
      <input
        type='range'
        value={painLevel}
        min='0'
        max='10'
        onInput={(e) => setPainLevel(e.target.value)}
      />
      <output>{painLevel}</output>
      {/* <datalist id='ticks'>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </datalist> */}
    </body>
  );
};

export default ReportPainLevels;
