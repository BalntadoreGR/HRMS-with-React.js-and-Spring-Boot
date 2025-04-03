import classes from './LoginCard.module.css';

const LoginCard = (props) => {
    return (
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    );
};

export default LoginCard;