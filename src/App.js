import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);
  
  const [key, setKey] = React.useState(false);

  const [decimal, setDecimal] = React.useState(false);
  const [place, setPlace] = React.useState(10);
  
  const [operator, setOperator] = React.useState('');
  const [lastOperatot, setLastOperator] = React.useState('');


  const watchRef = React.createRef();
  const updateRef = React.createRef();

  // For shrinking display when number overflows
  React.useLayoutEffect(() => {
    let font = 7;
    while (watchRef.current.clientWidth < watchRef.current.scrollWidth) {
      watchRef.current.style.fontSize = `calc(100vh / ${font})`;
      updateRef.current.style.fontSize = `calc(100vh / ${font})`;
      font += 1;
    }
  }, [watchRef, updateRef]);

  const Display = () => {
    return (
      <>
      <div className='display'>
        <div className='value' ref={updateRef}>
          {key? <>{value2.toLocaleString("en-US")}{decimal? '.' : ''}</> : <>{value.toLocaleString("en-US")}{decimal? '.' : ''}</>}{[...Array(Math.log10(place) - 1)].map((i) => 0)}
        </div>
      </div>
      {/* For making the value responsive */}
      <div className='display hidden'>
        <div className='black' ref={watchRef}>
          {value.toLocaleString("en-US")}
        </div>
      </div>
      </>
    );
  }

  const handleNumPress = (number) => {

    switch (number) { 
      case 'clear':
        setValue(0);
        setValue2(0);
        setKey(false);
        setOperator('');
        return;
      case 'negative':
        setValue(value * -1);
        setValue2(0);
        setOperator('');
        return;
      case 'hundredth':
        setValue(value / 100);
        setValue2(0);
        setOperator('');
        return;
      case 'equals':
        setKey(false);
        switch (operator) {
          case '+':
            setValue(value + value2);
            setValue2(0);
            setOperator('');
            break;
          case '-':
            setValue(value - value2);
            setValue2(0);
            setOperator('');
            break;
          case '*':
            setValue(value * value2);
            setValue2(0);
            setOperator('');
            break;
          case '/':
            setValue(value / value2);
            setValue2(0);
            setOperator('');
            break;
          default:
            break;
        }
        setOperator('');
        return;
      default:
        // if (operator === '.')
        break;
    }
    // setLastOperator(operator)

    if (Number.isInteger(number)) {
      if (operator === '') {
        if (decimal) {
          if (number === 0)
            setPlace(place * 10);
          else {
            setValue((value) + (number/place));
            setDecimal(false);
            setPlace(10);
          }
        }
        else 
          setValue(parseFloat((value+'') + (number+'')));
      }
      else {
        if (decimal) {
          if (number === 0)
            setPlace(place * 10);
          else {
            setValue2((value2) + (number/place));
            setDecimal(false);
            setPlace(10);
          }
        }
        else {
          setValue2(parseFloat((value2+'') + (number+'')));
          setKey(true);
        }
      }
    }

    
    // switch (operator) {
    //   // default if no operator is selected
    //   case '+':
    //     setValue(value + number);
    //     setOperator('');
    //     break;
    //   case '-':
    //     setValue(value - number);
    //     setOperator('');
    //     break;
    //   case '*':
    //     setValue(value * number);
    //     setOperator('');
    //     break;
    //   case '/':
    //     setValue(value / number);
    //     setOperator('');
    //     break;
    //   case '.':
    //     setValue(value + (number / 10));
    //     setOperator('');
    //     break;
    //   case 'answered':
    //     setValue(number);
    //     setOperator('');
    //     break;
    //   default:
    //     setValue(parseFloat((value+'') + (number+'')));
    // }
  }

  const Buttons = () => {
    return (
      <div className='buttons'>
        {/* Row 1 */}
        <div className='btnRow'>
          <div className='btn lGrey' onClick={() => handleNumPress('clear')}>
            <div className='key'>{value===0? 'AC': 'C'}</div>
          </div>
          <div className='btn lGrey' onClick={() => handleNumPress('negative')}>
            <div className='key'>+/-</div>
          </div>
          <div className='btn lGrey' onClick={() => handleNumPress('hundredth')}>
            <div className='key'>%</div>
          </div>
          <div className={operator=== '/'? 'btn active': 'btn orange'} onClick={() => setOperator('/')}>
          <div className='key'>&divide;</div>
          </div>
        </div>
        {/* Row 2 */}
        <div className='btnRow'>
          <div className='btn dGrey' onClick={() => handleNumPress(7)}>
            <div className='key'>7</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(8)}>
            <div className='key'>8</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(9)}>
            <div className='key'>9</div>
          </div>
          <div className={operator=== '*'? 'btn active': 'btn orange fade'} onClick={() => setOperator('*')}>
          <div className='key'>&times;</div>
          </div>
        </div>
        {/* Row 3 */}
        <div className='btnRow'>
          <div className='btn dGrey' onClick={() => handleNumPress(4)}>
            <div className='key'>4</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(5)}>
            <div className='key'>5</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(6)}>
            <div className='key'>6</div>
          </div>
          <div className={operator=== '-'? 'btn active': 'btn orange'} onClick={() => setOperator('-')}>
          <div className='key'>&minus;</div>
          </div>
        </div>
        {/* Row 4 */}
        <div className='btnRow'>
          <div className='btn dGrey' onClick={() => handleNumPress(1)}>
            <div className='key'>1</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(2)}>
            <div className='key'>2</div>
          </div>
          <div className='btn dGrey' onClick={() => handleNumPress(3)}>
            <div className='key'>3</div>
          </div>
          <div className={operator=== '+'? 'btn active': 'btn orange'} onClick={() => setOperator('+')}>
          <div className='key'>&#43;</div>
          </div>
        </div>
        {/* Row 5 */}
        <div className='btnRow'>
          <div className='btn dGrey wide' onClick={() => handleNumPress(0)}>
            <div className='key'>0</div>
          </div>
          <div className='btn dGrey' onClick={() => {if((operator==='' && value%1===0) || (operator!=='' && value2%1===0)) setDecimal(true)}}>
            <div className='key'>.</div>
          </div>
          <div className='btn orange' onClick={() => handleNumPress('equals')}>
          <div className='key'>=</div>
          </div>
        </div>
      </div>
    )
  }

  const Footer = () => {
    return <div className='footer'>
      <div className='col50'>&copy; 2021 Jay Jaber</div>
      <div className='col'>
          <a className="grey-text text-lighten-3" href="https://github.com/JayJaber">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
      <div className='col'>
        <a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/jay-jaber-7439bb1b3/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg>
        </a>
      </div>
      <div className='col'>
        <a href="mailto:calijayjaber@gmail.com">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
          </svg>
        </a>  
      </div>
    </div>
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <main>
        <Display/>
        <Buttons/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
