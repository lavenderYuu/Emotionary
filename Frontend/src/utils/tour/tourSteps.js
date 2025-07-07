import { offset } from '@floating-ui/dom';

// Adapted from: https://docs.shepherdjs.dev/recipes/cookbook/

export const createTourSteps = (onTourComplete) => [
  {
    id: 'intro',
    text: 'Welcome to emotionary! Click "Next" to start a quick tour. Click "Skip" to onboard later.',
    classes: '-intro',
    buttons: [
      {
        text: 'Skip',
        action: function () { this.cancel(); },
      },
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'click-create-entry',
    text: 'Get started by clicking the "Create an entry" button.',
    attachTo: {
      element: '#create-entry-button',
      on: 'left',
    },
    classes: '-left',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
    buttons: [
      {
        text: 'Next',
      },
    ],
  },
  {
    id: 'create-entry',
    text: 'This is where you create an entry. Let\'s start writing!',
    attachTo: {
      element: '#create-entry',
    },
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'entry-title',
    text: 'Give your journal entry a title.',
    attachTo: {
      element: '#create-entry-title',
      on: 'bottom',
    },
    classes: '-bottom',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'entry-date',
    text: 'Specify a date and time.',
    attachTo: {
      element: '#create-entry-date',
      on: 'bottom',
    },
    classes: '-bottom',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'entry-content',
    text: 'Add some content.',
    attachTo: {
      element: '#create-entry-content',
      on: 'bottom',
    },
      floatingUIOptions: {
      middleware: [
        offset(32),
      ],
    },
    classes: '-bottom',
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'entry-tags',
    text: 'You can manage your tags here.',
    attachTo: {
      element: '#create-entry-manage-tags',
      on: 'bottom',
    },
    classes: '-bottom',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'click-save-entry',
    text: 'Let\'s save your first entry!',
    attachTo: {
      element: '#save-entry-button',
      on: 'left',
    },
    classes: '-left',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
    buttons: [
      {
        text: 'Next',
      },
    ],
  },
   {
    id: 'complete',
    text: "Hooray! You're all set! 🎉",
    classes: '-intro',
    buttons: [
      {
        text: 'Done',
        action: function () {
          onTourComplete();
          this.cancel();
        },
      },
    ],
  },
];