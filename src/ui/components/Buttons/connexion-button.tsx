import './connexion-buttons.css';

type ConnexionButtonsProps = {
    isLogIn: boolean;
    connect: () => void;
};

export default function ConnexionButtons({ isLogIn, connect }: ConnexionButtonsProps) {
    return (
        <div className="connexion-button">
            <button
                onClick={connect}>
                    {isLogIn ? "Log in" : "Sign up"}
            </button>
        </div>
    )
}