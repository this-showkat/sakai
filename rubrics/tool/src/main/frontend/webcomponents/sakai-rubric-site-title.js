import {SakaiElement} from "/webcomponents/sakai-element.js";
import {html} from "/webcomponents/assets/lit-element/lit-element.js";

export class SakaiRubricSiteTitle extends SakaiElement {

  constructor() {

    super();

    this.siteId = "";
    this.siteTitle = "";
  }

  static get properties() {
    return { siteId: {type: String}, siteTitle: {attribute: true, type: String} };
  }

  attributeChangedCallback(name, oldValue, newValue) {

    super.attributeChangedCallback(name, oldValue, newValue);

    if ("siteid" === name) {
      this.setSiteTitle();
    }
  }

  render() {
    return html`${this.siteTitle}`;
  }

  setSiteTitle() {

    var self = this;
    jQuery.ajax({
      url: '/sakai-ws/rest/sakai/getSiteTitle?sessionid=' + sakaiSessionId + '&siteid=' + this.siteId
    }).done(function (response) {
      self.siteTitle = response;
    }).fail(function () {
      self.siteTitle = self.siteId;
    });
  }
}

customElements.define("site-title", SakaiRubricSiteTitle);