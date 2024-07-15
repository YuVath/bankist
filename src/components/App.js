import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...initialState,
        balance: 500,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "requestLoan":
      if (state.loan === 5000)
        return {
          ...state,
        };

      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      };

    case "payLoan":
      return {
        ...state,
        loan: state.loan - 5000,
        balance: state.balance - 5000,
      };

    case "closeAccount":
      if (state.balance === 0)
        return {
          ...initialState,
          isActive: false,
        };

      return {
        ...state,
      };

    default:
      return state;
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="container">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <button
        className={!isActive ? "beautiful-button" : "btn-disable"}
        disabled={isActive}
        onClick={() => dispatch({ type: "openAccount" })}
      >
        Open Account
      </button>

      <button
        className={isActive ? "beautiful-button" : "btn-disable"}
        disabled={!isActive}
        onClick={() => dispatch({ type: "deposit", payload: Number(150) })}
      >
        Deposit: 150
      </button>

      <button
        className={isActive ? "beautiful-button" : "btn-disable"}
        disabled={!isActive}
        onClick={() => dispatch({ type: "withdraw", payload: Number(50) })}
      >
        Withdraw: 50
      </button>

      <button
        className={
          isActive && loan !== 5000 ? "beautiful-button" : "btn-disable"
        }
        disabled={!isActive}
        onClick={() => dispatch({ type: "requestLoan", payload: Number(5000) })}
      >
        Request a loan of 5000
      </button>

      <button
        className={isActive && loan !== 0 ? "beautiful-button" : "btn-disable"}
        onClick={() => dispatch({ type: "payLoan" })}
        disabled={!isActive && loan === 0}
      >
        Pay loan
      </button>

      <button
        className={isActive ? "beautiful-button" : "btn-disable"}
        onClick={() => dispatch({ type: "closeAccount" })}
        disabled={!isActive}
      >
        Close Account
      </button>
    </div>
  );
}
