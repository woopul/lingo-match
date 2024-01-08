import styles from './MenuButtonMobile.module.css';

export type MenuButtonMobileProps = {
  isOpened?: boolean;
  onChange: () => void;
};

export const MenuButtonMobile = ({ isOpened, onChange }: MenuButtonMobileProps) => {
  return (
    <div className="MenuButtonMobile">
      <label>
        <input onChange={onChange} type="checkbox" />
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path className="line--1" d="M0 70l28-28c2-2 2-2 7-2h64" />
          <path className="line--2" d="M0 50h99" />
          <path className="line--3" d="M0 30l28 28c2 2 2 2 7 2h64" />
        </svg>
      </label>
    </div>
  );
};
