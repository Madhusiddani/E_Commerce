const Message = ({ children, type = 'info' }) => <div className={`message ${type}`}>{children}</div>;

export default Message;
