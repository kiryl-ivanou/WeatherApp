/** Class for creating a forecast inside provided container. */
export default class Forecast {
    /**
     * Declare forecast container for class.
     * @param {HTMLElement} forecastContainer - Container to render forecast in.
     */
    constructor(forecastContainer) {
        this.forecastContainer = forecastContainer;
    }

    /**
     * Generates forecast block with given parameters
     *
     * @param {string} title - Block title.
     * @param {string} icon - Block icon.
     * @param {string} description - Block description.
     * @param {object} properties - Properties to be added to created HTML element.
     * @public
     */
    generateForecastBlock(title, icon, description, properties = {}) {
        const forecastBlock = this.#createElement("div", null, {
            ...properties,
        });
        forecastBlock.classList.add("forecastBlock");

        forecastBlock.appendChild(
            this.#createElement("p", title, {
                class: "bold",
            })
        );
        forecastBlock.appendChild(
            this.#createElement("img", null, {
                class: "mainIcon",
                src: `/img/${icon}.svg`,
            })
        );
        forecastBlock.appendChild(this.#createElement("p", description));

        this.forecastContainer.appendChild(forecastBlock);
    }

    /**
     * Clears created forecast
     *
     * @public
     */
    clearForecast() {
        this.forecastContainer.replaceChildren();
    }

    /**
     * Creates HTML element with given parameters
     *
     * @param {string} elementType - Type of HTML element to be created.
     * @param {string} innerHTML - Inner content of created HTML element.
     * @param {object} properties - Properties to be added to created HTML element.
     * @private
     * @returns {HTMLElement} - Created element
     */
    #createElement(elementType, innerHTML, properties = {}) {
        const element = document.createElement(elementType);
        element.innerHTML = innerHTML || "";
        for (const [property, value] of Object.entries(properties)) {
            element.setAttribute(property, value);
        }
        return element;
    }
}
