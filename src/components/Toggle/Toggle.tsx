import './Toggle.css';

const Toggle = ({ checked }: any) => (
    <div className={`toggle ${checked ? 'checked' : ''}`}>
    </div>
);

export default Toggle;