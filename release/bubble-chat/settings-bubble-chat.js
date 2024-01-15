// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadSettings('bubble-chat-data.js', [
    defineSetting(
      [
        'Bubble Chat v1.1.0 by cafeaunat',
        '',
      ].join('\n'),
      'title',
      'text-display',
    ),
    bubblechatSettings,
    textSettings,
    badgeSettings,
    emoteSettings,
    alignmentSettings,
    animationSettings,
    disappearingSettings,
    filterSettings,
    pronounsSettings,
  ])
})

/************************
 * Settings Definitions *
 ************************/

function defineSetting(label, id, type, options) {
  return { label, id, type, ...options }
}

const alignmentSettings = defineSetting(
  'Chat Alignment',
  'alignment',
  'group',
  {
    settings: [
      defineSetting('Direction', 'direction', 'select-input', {
        defaultValue: 'vertical',
        options: ['Vertical', 'Horizontal'].map(label => {
          return { label, value: label.toLowerCase() }
        }),
      }),
      defineSetting('Corner', 'corner', 'select-input', {
        defaultValue: 'bottom-left',
        placeholder: 'Command prefix',
        options: ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'].map(
          label => {
            return { label, value: label.replaceAll(' ', '-').toLowerCase() }
          },
        ),
      }),
    ],
  },
)

const disappearingSettings = defineSetting(
  'Disappearing',
  'disappear',
  'group',
  {
    settings: [
      defineSetting('Expiration time (seconds)', 'expiration', 'number-input', {
        min: 0,
        step: 1,
        placeholder: 'Seconds',
        description:
          'Each messages will be removed after the expiration time. If empty or set to 0, messages will never expire.',
      }),
      defineSetting('Maximum number of messages', 'max', 'number-input', {
        defaultValue: 100,
        min: 0,
        max: 200,
        step: 1,
        description:
          'When there are more messages than the max, the oldest messages will be removed.',
      }),
    ],
  },
)

const emoteSettings = defineSetting('Emotes', 'emotes', 'group', {
  settings: [
    defineSetting('Static emotes', 'static', 'boolean-input', {
      defaultValue: false,
      description:
        'When enabled, all emotes will be static instead of animated.',
    }),
    defineSetting('Dynamic emote sizing', 'dynamic', 'boolean-input', {
      defaultValue: true,
      description:
        'When enabled, emotes are larger when the chat message only contains emotes.',
    }),
    defineSetting(
      'Dynamic emote sizing example',
      'dynamicPreview',
      'image-display',
      {
        url: 'https://i.imgur.com/vfHCWjB.png',
        alt: [
          'Three chat messages.',
          "The first one contains text and an emote, showing the emote at it's normal size.",
          'The second one contains 2 emotes, showing the emotes at a larger size.',
          "The third one contains a single emote, showing the emote at it's largest size.",
        ].join('\n'),
      },
    ),
  ],
})

const badgeSettings = defineSetting('Badges', 'badges', 'group', {
  settings: [
    defineSetting('Show Twitch Badges', 'display', 'boolean-input', {
      defaultValue: true,
    }),
    defineSetting('Badge Size (px)', 'size', 'number-input', {
      defaultValue: 24,
      min: 0,
      step: 1,
    }),
    defineSetting('Custom Broadcaster Badge', 'broadcasterBadge', 'image-input', {}),
    defineSetting('Custom Moderator Badge', 'modBadge', 'image-input', {}),
    defineSetting('Custom VIP Badge', 'vipBadge', 'image-input', {}),
    defineSetting('Custom Founder Badge', 'founderBadge', 'image-input', {}),
    defineSetting('Custom Artist Badge', 'artistBadge', 'image-input', {}),
  ],
})

const pronounsSettings = defineSetting('Pronouns', 'pronouns', 'group', {
  settings: [
    defineSetting(
      'Set your pronouns here: https://pronouns.alejo.io/',
      'link',
      'text-display',
    ),
    defineSetting('Pronouns Display', 'display', 'select-input', {
      defaultValue: 'lowercase',
      options: ['Lowercase', 'Capitalize', 'Uppercase', 'Hidden'].map(label => {
        return { label, value: label.toLowerCase() }
      }),
      description: [
        'Examples:',
        '- Lowercase: she/her',
        '- Capitalize: She/Her',
        '- Uppercase: SHE/HER',
        'Hidden: For when you want a more compact chat.',
      ].join('\n'),
    }),
  ],
})

const botFilterSettings = defineSetting('Bot Filters', 'botFilters', 'group', {
  settings: [
    defineSetting('Bots to hide', 'names', 'text-input', {
      multiple: true,
      defaultValue: ['Sery_Bot', 'Nightbot', 'StreamElements', 'Streamlabs'],
      placeholder: 'Bot name',
      description: 'Use this to hide chat messages from specific bots.',
    }),
    defineSetting('Command prefixes to hide', 'prefixes', 'text-input', {
      multiple: true,
      defaultValue: ['!'],
      placeholder: 'Command prefix',
      description:
        'Chat messages that start with these prefixes will be hidden. For example, if one of the prefixes is ! then messages like !socials or !followage will be hidden.',
    }),
  ],
})

const userFilterSettings = defineSetting(
  'User Filters',
  'userFilters',
  'group',
  {
    settings: [
      defineSetting(
        'Show messages from these types of users',
        'types',
        'select-input',
        {
          multiple: true,
          defaultValue: ['all', 'subs', 'mods', 'vips', 'followers', 'artists'],
          options: [
            { label: 'Everyone', value: 'all' },
            { label: 'Followers', value: 'followers' },
            { label: 'Subscribers', value: 'subs' },
            { label: 'Moderators', value: 'mods' },
            { label: 'VIPs', value: 'vips' },
            { label: 'Artists', value: 'artists' },
          ],
        },
      ),
      defineSetting('Follow age (hours)', 'followHours', 'number-input', {
        min: 0,
        step: 'any',
        placeholder: 'Hours',
        description:
          "If you're using the follower option above, users will only be considered a follower if they have followed for at least this many hours.",
      }),
      defineSetting(
        'Always show messages from these users',
        'users',
        'text-input',
        {
          multiple: true,
          placeholder: 'Username',
          description:
            'These users will always have their messages shown regardless of the options above.',
        },
      ),
    ],
  },
)

const messageFilterSettings = defineSetting(
  'Message Filters',
  'messageFilters',
  'group',
  {
    settings: [
      defineSetting('Hide these message types', 'types', 'select-input', {
        multiple: true,
        defaultValue: [],
        options: [
          { label: 'First-time chat', value: 'first' },
          { label: '/me message', value: 'action' },
          { label: 'Messages with text', value: 'text' },
          { label: 'Messages with emotes', value: 'emote' },
          { label: 'Message with bits', value: 'cheer' },
          { label: 'Replies', value: 'reply' },
          { label: 'Highlighted', value: 'highlight' },
          { label: 'Channel point redemption message', value: 'redeem' },
          { label: 'Resub message', value: 'resub' },
          { label: 'Announcements', value: 'announcement' },
        ],
      }),
      defineSetting(
        'Hide messages containing these words',
        'words',
        'text-input',
        {
          multiple: true,
          description:
            'Messages that contain these words will never be shown, regardless of other filters.',
        },
      ),
    ],
  },
)

const filterSettings = defineSetting('Filters', 'filters', 'group', {
  settings: [botFilterSettings, userFilterSettings, messageFilterSettings],
})

const textSettings = defineSetting('Text Styles', 'textStyles', 'group', {
  settings: [
    defineSetting('Font Name', 'font', 'font-input', {
      defaultValue: 'Nunito',
    }),
    defineSetting('Font Size (px)', 'size', 'number-input', {
      defaultValue: 16,
      min: 0,
      step: 1,
    }),
    defineSetting('Font Weight', 'weight', 'select-input', {
      defaultValue: 400,
      options: ['Normal', 'Bold']
        .map(label => {
          return { label, value: label.toLowerCase() }
        })
        .concat(
          [100, 200, 300, 400, 500, 600, 700, 800, 900].map(value => {
            return { label: value.toString(), value }
          }),
        ),
    }),
    defineSetting('Edge Style', 'edge', 'select-input', {
      defaultValue: 'soft-shadow',
      options: [
        'Outline 1',
        'Outline 2',
        'Soft Shadow',
        'None',
      ].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    }),
    defineSetting('Text Color (Name)', 'nameColor', 'color-input', {
      defaultValue: '#24273a',
    }),
    defineSetting('Text Color (Message)', 'msgColor', 'color-input', {
      defaultValue: '#24273a',
    }),
  ],
})

const animationSettings = defineSetting('Animations', 'animations', 'group', {
  settings: [
    defineSetting('Entrance Animation', 'enter', 'select-input', {
      defaultValue: 'none',
      options: ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    }),
    defineSetting('Exit Animation', 'exit', 'select-input', {
      defaultValue: 'none',
      options: ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    }),
  ],
})

const bubblechatSettings = defineSetting('Bubble Chat settings', 'bubblechat', 'group', {
  settings: [
    defineSetting('Colors', 'colors', 'text-display', {}),
    defineSetting('Twitch Color Name Background', 'twitchBg', 'boolean-input', {
      defaultValue: false,
      description: 'Will use a pastel version of the color from the chosen username-color on Twitch as the background color for each user. This will ignore the field Name Background.'
    }),
    defineSetting('Color Mode', 'colorMode', 'select-input', {
      description: 'Pair Dark or Light mode with one of the colors in the dropdown. For custom colors, ignore the dropdown, and choose colors with the color pickers accordingly.',
      options: [
        {label: 'Light', value: 'light'},
        {label: 'Dark', value: 'dark'},
      ],
    }),
    defineSetting('Theme', 'theme', 'dropdown-input', {
      options: [
        'Pink', 'Orange', 'Teal', 'Blue'
      ].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    }),
    defineSetting('Name Background', 'nameBg', 'color-input', {
      defaultValue: '#f5c2e7'
    }),
    defineSetting('Message Background', 'msgBg', 'color-input', {
      defaultValue: '#eff1f5'
    }),
  ]
})

