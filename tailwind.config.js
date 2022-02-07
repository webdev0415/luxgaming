module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#173144',
        secondary: '#081114',
        navbar: '#063C5C',
        brown: '#58280F',
        darkBrown: '#554328',
        lightBrown: '#D39E5F',
        orange: '#C25C12',
        luxYellow: '#f7bb44',
        lightGrey: '#B3C0B9',
        darkBlue: '#323542',
        borderColor: '#30A1CF',
        progessBarColor: "#0000004a",
        profileXPColor: "#1286b5",
        positiveColor: "#7dab24",
        menuTopColor:"#02293826",
        tableBorderColor: "#5c5c5c2e",
        profileBG:"#080910",
        ADStatsColor: "#787778",
        buttonColor: "#022646",
        lxGrey: '#4a5e6f',
        purple : '#740074',
        infoBox: '#1F70941a',
        infoBlue: '#023a46',
        forumSection: '#173144',
        forumBorderColor: '#30A1CF',
        forumBox : '#0E2941',
        forumPost : '#1F7094',
        forumNews: '#1F70943a',
        tournamentAdminBtn: '#0F2335',
        tournamentInput: '#1F70947a',
        tournamentDetailsHeader: '#30B4CF4a',
        downloadBar: '#0226467a',
        payPal: '#3b7bbf'
        
      },
      boxShadow: {
       'inner': 'inset 0px -2px 20px 0px #054e6a05',
       'innerButton': 'inset 0px 0px 15px #016B9B',
       forumBox: 'inset 0px 0px 12px rgba(46, 161, 207, 0.6)'
      },
      backgroundImage: {
        'long-button': "url('/longbutton.svg')",
        'map': "url('/map.svg')",
        'navbar-small-image': "url('/navbar/navbarsmall.svg')",
        'navbar-large-image': "url('/navbar/navbarlarge.svg')",
        'navbar-profile-left': "url('/navbar/leftnav.svg')",
        'navbar-profile-right': "url('/navbar/rightnavbox.svg')",
        'navbar-profile': "url('/navbarprofile.svg')",
        'box-slanted-left': "url('/navbuttons/boxslantedleft.svg')",
        'box-slanted-left-hover': "url('/navbuttons/boxslantedlefthover.svg')",
        'box-slanted-right': "url('/navbuttons/boxslantedright.svg')",
        'box-slanted-right-hover': "url('/navbuttons/boxslantedrighthover.svg')",
        'box-button': "url('/navbuttons/boxbutton.svg')",
        'box-button-hover': "url('/navbuttons/boxbuttonhover.svg')",
        'duel-card': "url('/duelcard.svg')",
        'profile-blue-hexagon': "url('/profile/bluehexagon.svg')",
        'tournament-option-one': "url('/tournament/tournamentOption.svg')",
        'tournament-option-two': "url('/tournament/tournamentOption2.svg')",
        'tournament-action-left': "url('/tournament/leftbutton.svg')",
        'tournament-action-right': "url('/tournament/rightbutton.svg')",
        'tournament-duel-card': "url('/tournament/duelcard.svg')",
        'tournament-details-bg': "url('/tournament/headerbg.svg')",
        'create-tournament-btn': "url('/tournament/createTournament.svg')",
        'glow': "url('/buttons-background-img.png')",
        "radiant": "url('/radiantBG.png')",
        "tournament-bg": "url(/tournament-bg.png)",
        "active-players": "url(/active-players.png)",
        "download-bar" : "url(/tournament/searchcover.svg)",
        "trans": "url(/trans.jpeg)"
       },
       backgroundSize: {
         '100%' : '100%'
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
