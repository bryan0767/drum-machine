import React from 'react'
import ReactDOM from 'react-dom';
import './App.css'

const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    powerButton: 'Off',
    bankOne: [...bankOne],
    bankTwo: [...bankTwo],
    currentBank:[...bankOne]
    }
  };

  componentDidMount() {
    const one = document.querySelector('.bank1')
    one.addEventListener('click',this.setBankOne)
    const two = document.querySelector('.bank2')
    two.addEventListener('click',this.setBankTwo)
    document.addEventListener('keydown',(e) => {
      if(e.keyCode === 49) {
        this.setBankOne()
      } else if (e.keyCode === 50) {
        this.setBankTwo()
      } else if (e.keyCode === 27) {
        this.power()
      } else {
        this.playSound(e)
      }
    });
    const volume = document.querySelector('input')
    volume.addEventListener('change',this.volume)
    const power = document.getElementById('power')
    power.addEventListener('click',this.power)
    const display = document.querySelector('.display')
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      button.addEventListener('click',this.clickSound);
      button.innerHTML=button.dataset.label;
      button.classList.add('button')
    })
    display.innerHTML = 'Off'
}

    power = (e) => {
      const display = document.querySelector('.display')
      const one = document.querySelector('.bank1')
      const two = document.querySelector('.bank2')

    if (this.state.powerButton === '') {
        display.innerHTML = 'On'
        this.setState({
          powerButton: 'On'
        })
      } else if(this.state.powerButton === 'On'){
        display.innerHTML = 'Off'
        this.setState({
          powerButton:'Off'
        })
        one.style.border= 'none'
        two.style.border= 'none'
      } else {
        display.innerHTML = 'On'
        this.setState({
          powerButton:'On'
        })
      }
    }

    playSound = (e) => {
      const audio = document.querySelector(`audio[id="${e.keyCode}"]`)
      const display = document.querySelector('.display')
      const key = document.querySelector(`button[id="${e.keyCode}"]`)
      const keys = document.querySelectorAll('button')
      let playing = false

        if(!audio) return;
        else if (this.state.powerButton === 'Off') return;
        else if(this.state.powerButton === 'On') {
         playing =true
        audio.play();
        audio.currentTime=0;
        display.innerHTML = this.state.bankOne[audio.dataset.key].id
        key.classList.add('playing')
        keys.forEach(key => {
          key.addEventListener('transitionend', () => {
            key.classList.remove('playing')
          })
        })
        }
      };

    clickSound = (e) => {
      const audio = document.querySelector(`audio[id="${e.target.id}"]`);
      const display = document.querySelector('.display')
      const key = document.querySelector(`button[id="${e.target.id}"]`)
      const keys = document.querySelectorAll('button')

      if(!audio) return;
      else if (this.state.powerButton === 'Off') return;
      else if(this.state.powerButton === 'On') {
      audio.play()
      display.innerHTML = this.state.bankOne[e.target.dataset.key].id;
      audio.currentTime=0
      key.classList.add('playing')
      keys.forEach(key => {
        key.addEventListener('transitionend', () => {
          key.classList.remove('playing')
        })
      })}
      }

volume = (e) => {
  const audio = document.querySelectorAll('audio')
  const display = document.querySelector('.display')
  const audios =[...audio]

  audios.forEach(audio => {
    if(e.target.value == 1) {
    display.innerHTML = `Max`
    audio.volume = e.target.value
  } else if(e.target.value == 0) {
    display.innerHTML = 'Volume Off'
    audio.volume = e.target.value
  } else {
    audio.volume = e.target.value
    display.innerHTML = `Volume: ` + e.target.value * 100
  }})
}

setBankOne =(e)=> {
  const display = document.querySelector('.display')
  const one = document.querySelector('.bank1')
  const two = document.querySelector('.bank2')

  this.setState({
    currentBank: [...bankOne]
  })

  display.innerHTML = 'Heavy Kit'
  two.style.border='none'
  one.style.border = '2px solid #ffb76b'
}

setBankTwo =()=> {
  const display = document.querySelector('.display')
  const one = document.querySelector('.bank1')
  const two = document.querySelector('.bank2')

  this.setState({
    currentBank: [...bankTwo]
  })

    display.innerHTML = 'Smooth Kit'
    one.style.border='none'
    two.style.border = '2px solid #ffb76b'
}

reset = () => {
  const display = document.querySelector('.display')
  display.innerHTML=''
}

  render() {
    return(

<div className='drum'>

<div id ='left'>
</div>

<div className='machine'>

<div className ='main'>

<div className='top'>
<div className='top2'>
<div id ='orange'></div>
<div id ='power'></div>
</div>

<div className='bottom2'>
<div className='titles'>
<div id ='title'>Low</div>
<div id ='title'>Low-Mid</div>
<div id ='title'>Mid</div>
<div id ='title'>Mid-Hight</div>
<div id ='title'>Highs</div>
</div>

<div className='blanks'>
<div id ='blank'>
<div id='blanktop'>
<div id ='circle'></div>
<div id ='circle'></div>
</div>
<div id='blankbot'>
<div id ='circle1'></div>
<div id ='circle'></div>
</div>
</div>


<div id ='blank'>
<div id='blanktop'>
<div id ='circle'></div>
<div id ='circle'></div>
</div>
<div id='blankbot'>
<div id ='circle'></div>
<div id ='circle'></div>
</div>
</div>

<div id ='blank'>
<div id='blanktop'>
<div id ='circle'></div>
<div id ='circle1'></div>
</div>
<div id='blankbot'>
<div id ='circle1'></div>
<div id ='circle'></div>
</div>
</div>

<div id ='blank'>
<div id ='blanktop'>
<div id ='circle'></div>
<div id ='circle'></div>
</div>
<div id ='blankbot'>
<div id ='circle'></div>
<div id ='circle'></div>
</div>
</div>

<div id ='blank'>
<div id ='blanktop'>
<div id ='circle'></div>
<div id ='circle1'></div>
</div>
<div id ='blankbot'>
<div id ='circle'></div>
<div id ='circle1'></div>
</div>
</div>

</div>
</div>

</div>

<div className='bottom'>
<div className = 'bank1'>HK</div>
<div className = 'bank2'>SK</div>
<div className = 'display'></div>

<div id ='stops'>
<div id='minititle'>
<div id='minicontrol'>Transport</div>
</div>
<div id='junk'>
<div id ='smalltop'>
<div id ='mini'></div>
<div id ='mini'></div>
<div id ='mini'></div>
</div>
<div id ='small'></div>
</div>

</div>

<div id ='stops'>
<div id='minititle'>
<div id='minicontrol'>Record</div>
</div>
<div id='junk'>
<div id ='smalltop'>
<div id ='mini'></div>
<div id ='mini'></div>
<div id ='mini'></div>
</div>
<div id ='small'></div>
</div>

</div>
<div className = 'volume'>
<input type='range' min='0' max='1' step='.1'
defaultValue ='.5'/>
</div>
</div>

</div>

  <div className ='buttons'>
      <button  id='81' data-key='0'  data-label='Q'/>
      <button  id='87' data-key='1' data-label='W'/>
      <button  id='69' data-key='2'  data-label='E'/>
      <button  id='65' data-key='3' data-label='A'/>
      <button  id='83' data-key='4'  data-label='S'/>
      <button  id='68' data-key='5'  data-label='D'/>
      <button  id='90' data-key='6'  data-label='Z'/>
      <button  id='88' data-key='7'  data-label='X'/>
      <button  id='67' data-key='8'  data-label='C'/>
    </div>

</div>

<div id ="right">
</div>

<audio id='81' src={this.state.currentBank[0].url} data-key='0'/>
<audio id='87' src={this.state.currentBank[1].url} data-key='1'/>
<audio id='69' src={this.state.currentBank[2].url} data-key='2'/>
<audio id='65' src={this.state.currentBank[3].url} data-key='3'/>
<audio id='83' src={this.state.currentBank[4].url} data-key='4'/>
<audio id='68' src={this.state.currentBank[5].url} data-key='5'/>
<audio id='90' src={this.state.currentBank[6].url} data-key='6'/>
<audio id='88' src={this.state.currentBank[7].url} data-key='7'/>
<audio id='67' src={this.state.currentBank[8].url} data-key='8'/>


</div>


    )
  }
};

export default Drum
