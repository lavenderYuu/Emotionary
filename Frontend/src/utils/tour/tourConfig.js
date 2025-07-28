import { offset } from '@floating-ui/dom';

export const UserTourStatus = {
  NOT_STARTED: 'not-started',
  SKIPPED: 'skipped',
  COMPLETED: 'completed'
};

// Adapted from: https://docs.shepherdjs.dev/recipes/cookbook/

export const createTourSteps = ({ handleTourSkip, handleTourComplete }) => [
  {
    id: 'intro',
    text: 'Welcome to emotionary! Click "Next" to start a quick tour. Click "Skip" to complete the tour the next time you log in.',
    classes: '-intro',
    buttons: [
      {
        text: 'Skip',
        action: function () { 
          handleTourSkip();
        },
      },
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'click-create-entry',
    text: 'Get started by clicking on the "Create an entry" button.',
    attachTo: {
      element: '#create-entry-button',
      on: 'left',
    },
    classes: '-left -no-button',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
  },
  {
    id: 'create-entry',
    text: 'This is where you create an entry. Let\'s start writing!',
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
        offset(20),
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
    text: 'Click "Save" to save your entry.',
    attachTo: {
      element: '#save-entry-button',
      on: 'left',
    },
    classes: '-left -no-button',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
  },
  {
    id: 'created-entry',
    text: 'Hooray, you\'ve created an entry! The dashboard will automatically update with your changes.',
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'select-entry',
    text: 'Click on a card to view the entry.',
    attachTo: {
      element: '#entry-card:first-child',
      on: 'top',
    },
    classes: '-top -no-button',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
  },
  {
    id: 'view-entry',
    text: 'This is where you view an entry.',
    buttons: [
      {
        text: 'Next',
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'entry-mood',
    text: 'This is the analyzed sentiment of your entry. You can click here to change it.',
    attachTo: {
      element: '#mood-button',
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
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'edit-entry',
    text: 'You can also edit your entry here, but let\'s skip that for now.',
    attachTo: {
      element: '#edit-button',
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
        action: function () { this.next(); },
      },
    ],
  },
  {
    id: 'close-entry',
    text: 'Let\'s close this view by clicking "X".',
    attachTo: {
      element: '#close-button',
      on: 'left',
    },
    classes: '-left -no-button',
    floatingUIOptions: {
      middleware: [
        offset(16),
      ],
    },
  },
  {
    id: 'entry-kebab',
    text: 'You can also edit or delete your entry here.',
    attachTo: {
      element: '#kebab-button',
      on: 'right',
    },
    classes: '-right',
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
    id: 'home',
    text: 'You are currently on the "Home" page.',
    attachTo: {
      element: '#nav-Home',
      on: 'bottom',
    },
    classes: '-bottom -twoline',
    floatingUIOptions: {
      middleware: [
        offset(24),
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
    id: 'insights',
    text: 'Under "Insights", you can view different charts and graphs of your moods.',
    attachTo: {
      element: '#nav-Insights',
      on: 'bottom',
    },
    classes: '-bottom -threeline',
    floatingUIOptions: {
      middleware: [
        offset(24),
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
    id: 'entries',
    text: 'Under "Entries", you can filter your entries by date, mood, tags, and favorites.',
    attachTo: {
      element: '#nav-Entries',
      on: 'bottom',
    },
    classes: '-bottom -threeline',
    floatingUIOptions: {
      middleware: [
        offset(24),
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
    id: 'time-capsule',
    text: 'Under "Time Capsule", you can write a letter to your future self.',
    attachTo: {
      element: '#nav-TimeCapsule',
      on: 'bottom',
    },
    classes: '-bottom -twoline',
    floatingUIOptions: {
      middleware: [
        offset(24),
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
    id: 'search',
    text: 'Under "Search", you can search for your entries by title, content, or tags.',
    attachTo: {
      element: '#search-bar',
      on: 'bottom',
    },
    classes: '-bottom -threeline',
    floatingUIOptions: {
      middleware: [
        offset(24),
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
    id: 'complete',
    text: 'That\'s the end of the tour! You\'re all set! 🎉',
    classes: '-intro',
    buttons: [
      {
        text: 'Done',
        action: function () {
          handleTourComplete();
        },
      },
    ],
  },
];