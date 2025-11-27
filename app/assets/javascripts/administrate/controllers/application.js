import { Application } from "@hotwired/stimulus";

const application = Application.start();

// Configure Stimulus development experience
application.debug = false;
window.Stimulus   = application;

// Workaround for Stimulus controllers not being properly disconnected
// https://github.com/hotwired/stimulus/issues/104#issuecomment-365393601
document.addEventListener('turbo:before-cache', function() {
  application.controllers.forEach(function(controller){
    if(typeof controller.teardown === 'function') {
      controller.teardown();
    }
  });
});

export { application };
