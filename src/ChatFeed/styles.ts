export default {
  chatPanel: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    flex: 1,
    overflow: 'hidden',
  },
  chatHistory: { overflow: 'auto' },
  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
    position: 'relative' as 'relative',
  },
  img: {
    borderRadius: 100,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: 36,
    zIndex: 100,
  },
};
