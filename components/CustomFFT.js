const React = require('react');
const { fft } = require('dsp.js');

class CustomFFT extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputSignal: '',
      fftResult: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFft = this.handleFft.bind(this);
  }

  handleInputChange(event) {
    this.setState({ inputSignal: event.target.value });
  }

  handleFft() {
    const inputSignalArray = this.state.inputSignal.split(',').map((value) => parseFloat(value));
    const fftObject = new fft(inputSignalArray.length, 44100);
    fftObject.forward(inputSignalArray);
    this.setState({ fftResult: fftObject.spectrum });
  }

  render() {
    const { data } = this.props;
    const { inputSignal, fftResult } = this.state;

    return (
      <div>
        <label>Input Signal:</label>
        <input type="text" value={inputSignal} onChange={this.handleInputChange} />
        <button onClick={this.handleFft}>Perform FFT</button>
        {fftResult && (
          <div>
            <label>FFT Result:</label>
            <pre>{JSON.stringify(fftResult, null, 2)}</pre>
          </div>
        )}
        {data && (
          <div>
            <label>Data:</label>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

module.exports = CustomFFT;
