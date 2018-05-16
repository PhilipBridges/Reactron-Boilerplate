'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  navPane: {
    display: 'flex',
    flexWrap: 'nowrap',
    position: 'relative',
  },

  navPaneItem: {
    position: 'relative',
    flexGrow: '1',
    flexShrink: '0',
    display: 'flex'
  },

  title: {
    position: 'relative',
    color: '#000000',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif',
    fontSize: '15px',
    textTransform: 'uppercase',
    padding: '0 24px',
    overflow: 'hidden',
    cursor: 'default',
    userSelect: 'none'
  },

  titleDark: {
    color: '#ffffff'
  }
};