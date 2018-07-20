import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import demoStates from '../data/demo_states.js';
import provideHass from '../data/provide_hass.js';
import '../components/demo-cards.js';

const CONFIGS = [
  {
    heading: 'Basic',
    config: `
- type: entities
  entities:
    - scene.romantic_lights
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
    - light.non_existing
    `
  },
  {
    heading: 'With title, toggle-able',
    config: `
- type: entities
  entities:
    - scene.romantic_lights
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
  title: Random group
    `
  },
  {
    heading: 'With title, toggle = false',
    config: `
- type: entities
  entities:
    - scene.romantic_lights
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
  title: Random group
  show_header_toggle: false
    `
  },
  {
    heading: 'With title, can\'t toggle',
    config: `
- type: entities
  entities:
    - device_tracker.demo_paulus
  title: Random group
    `
  },
  {
    heading: 'Custom name, secondary info',
    config: `
- type: entities
  entities:
    - entity: scene.romantic_lights
      name: ¯\\_(ツ)_/¯
    - entity: device_tracker.demo_paulus
      secondary_info: entity-id
    - entity: cover.kitchen_window
      secondary_info: last-changed
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
  title: Random group
  show_header_toggle: false
    `
  },
];

class DemoEntities extends PolymerElement {
  static get template() {
    return html`
      <demo-cards
        id='demos'
        hass='[[hass]]'
        configs="[[_configs]]"
      ></demo-cards>
    `;
  }

  static get properties() {
    return {
      _configs: {
        type: Object,
        value: CONFIGS
      },
      hass: Object,
    };
  }

  ready() {
    super.ready();
    provideHass(this.$.demos, {
      states: demoStates,
    });
  }
}

customElements.define('demo-hui-entities-card', DemoEntities);
