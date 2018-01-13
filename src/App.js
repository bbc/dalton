import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/css/index.css';

const components = {
  "test": "test",
  "secondTest": "secondTest"
};

class Dalton extends React.Component {
    constructor(props) {
        super(props);
        const selected = props.selectedComponent || Object.keys(components)[0];
        this.state = {
            selected,
            Preview: components[selected]
        };

        this.selectComponent = this.selectComponent.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {
        window.bbccookies = {
            _getCurrentDomain: () => window.location.hostname,
            set: () => null
        };

        const { selected } = this.state;
        document.head.insertAdjacentHTML(
            'beforeend',
            `<meta name="viewport" content="width=device-width, initial-scale=1">`
        );
        document.head.insertAdjacentHTML('beforeend', styles);

        if (!('ontouchstart' in document.documentElement)) {
            document.documentElement.classList.add('n-no-touchevents');
        }
    }

    selectComponent(event) {
        const selected = event.target.value;

        this.setState({
            selected,
            Preview: components[selected]
        });
    }

    toggleSidebar() {
        this.setState({ disabled: !this.state.disabled });
    }

    render() {
        const Preview = this.state.Preview;

        return (
            <div>
                <div className={this.state.disabled ? 'sidebar__hidden' : 'sidebar'}>
                    <button className="sidebar__button" onClick={this.toggleSidebar}>
                        &times;
                    </button>
                    <h2 className="sidebar__item">Menu</h2>
                    {Object.keys(components).map(item => (
                        <button key={item} onClick={this.selectComponent} value={item} className="sidebar__button">
                            {item}
                        </button>
                    ))}
                </div>
                <div className={this.state.disabled ? 'dalton__fullscreen' : 'dalton'}>
                    <div>
                        <button
                            className={this.state.disabled ? 'dalton__button' : 'dalton__button-hidden'}
                            onClick={this.toggleSidebar}
                        >
                            ☰
                        </button>
                        <div>
                            <h2 className="dalton__title">{this.state.selected}</h2>
                            <hr />
                            <div className="dalton__container">
                                {/* <Preview /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dalton.defaultProps = {
    selectedComponent: ''
};

Dalton.propTypes = {
    selectedComponent: PropTypes.string
};

export default Dalton;
