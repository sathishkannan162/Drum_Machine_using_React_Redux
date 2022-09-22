//Importing modules
const { Provider, connect } = ReactRedux;
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;


const projectName = "A Drum Machine";
const KEYPRESS = "key_press";

// data for our applications

const keyNames = [
'Q',
'W',
'E',
'A',
'S',
'D',
'Z',
'X',
'C'];


const keyAudios = [
"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"];

const musicNames = [
"Heater-1",
"Heater-2",
"Heater-3",
"Heater-4",
"Clap",
"Open-HH",
"Kick-n'-Hat",
"Kick",
"Closed-HH"];



// action creator for pressMusic

let keyMusic = keyPress => {
  return {
    type: KEYPRESS,
    payload: keyPress };

};

// reducer for keyMusic

let keyPressReducer = function (state = { keyPressed: "Display " }, action) {

  switch (action.type) {

    case KEYPRESS:
      return {
        keyPressed: action.payload };

    default:
      return state;}


};

const rootReducer = combineReducers({
  keyPressReducer: keyPressReducer });


let store = createStore(rootReducer);


class Drumpad extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("audio", { id: this.props.keyName, className: "clip", src: keyAudios[keyNames.indexOf(this.props.keyName)], key: this.props.keyName }));

  }}




class DrumPads extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.keyInput = this.keyInput.bind(this);
  }

  playAudio(e) {
    var x = document.getElementById(e.target.value);
    x.play();
    this.props.submitKeyPress(e.target.value);
  }

  keyInput(e) {
    document.getElementById(musicNames[keyNames.indexOf(String.fromCharCode(e.keyCode))]).click();
    document.getElementById(musicNames[keyNames.indexOf(String.fromCharCode(e.keyCode))]).classList.add("press-button");
    setTimeout(() => document.getElementById(musicNames[keyNames.indexOf(String.fromCharCode(e.keyCode))]).classList.remove("press-button"), 100);

  }

  render() {
    document.addEventListener("keydown", this.keyInput);

    let listKeys = keyNames.map(item => {
      return /*#__PURE__*/(
        React.createElement("button", { id: musicNames[keyNames.indexOf(item)], className: "drum-pad ", value: item, onClick: this.playAudio, key: musicNames[keyNames.indexOf(item)] }, /*#__PURE__*/
        React.createElement(Drumpad, { keyName: item }),
        item));


    });


    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-pads" },
      listKeys));



  }}


class Display extends React.Component {
  render() {
    function replaceIphen(str) {
      if (str == undefined) {
        return " ";
      } else
      if (/Heater/.test(str)) {
        return str.replace("-", " ");
      }
      return str;
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "display" },
      replaceIphen(musicNames[keyNames.indexOf(this.props.stateKeyPress.keyPressed)])));


  }}

// Heading 
const ProjectName = () => {
  return /*#__PURE__*/React.createElement("h1", { id: "page-title" }, "A Drum Machine");
};



// logo
const NameLogo = () => {
  return /*#__PURE__*/React.createElement("div", { id: "name-logo" }, /*#__PURE__*/
  React.createElement("p", { id: "name" }, "SAT", /*#__PURE__*/
  React.createElement("i", { className: "fab fa-free-code-camp" })));


};

// Drum machine contains your logo
class DrumMachine extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine", className: "card" }, /*#__PURE__*/
      React.createElement("div", { className: "card-body" }, /*#__PURE__*/
      React.createElement(NameLogo, null), /*#__PURE__*/
      React.createElement(DrumPadsContainer, null), /*#__PURE__*/
      React.createElement(DisplayContainer, null))));



  }}


//mapStateToProps 
let mapStateToProps = state => {
  return {
    stateKeyPress: state.keyPressReducer };

};

//map dispatch to props
let mapDispatchToProps = dispatch => {
  return {
    submitKeyPress: message => {
      return dispatch(keyMusic(message));
    } };

};

const DrumPadsContainer = connect(mapStateToProps, mapDispatchToProps)(DrumPads);
const DisplayContainer = connect(mapStateToProps, null)(Display);



class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement("div", { id: "app-background" }, /*#__PURE__*/
      React.createElement(ProjectName, null), /*#__PURE__*/
      React.createElement(DrumMachine, null),
      React.createElement("footer", {id: "attribution"},"Attribution: This project is an exact replica of 'A Drum Machine' at Freecodecamp at URL: ",
      React.createElement("a", {href: "https://codepen.io/freeCodeCamp/full/MJyNMd" }, "https://codepen.io/freeCodeCamp/full/MJyNMd"),React.createElement("span", {id: "remain"}, ". This project was done as a part of course work of Front End development libraries course on Freecodecamp."))
      )));
      



  }}


//Render to DOM
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));