import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { sliders } from "./modules/sliders";
import { wrapSlider } from "./modules/wrapSlider";
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	sliders.init();
	wrapSlider.init();

	config.log('app init')
	
};

export { App };