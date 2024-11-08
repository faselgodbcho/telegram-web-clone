import SidebarHeader from "./SidebarHeader";
import UserContacts from "./UserContacts";

const ChatSidebar = () => {
  return (
    <div
      className={`w-[26.5rem] h-screen dark:bg-primary-dark bg-primary-light`}
    >
      <div className="flex flex-col gap-4">
        <SidebarHeader />
        <UserContacts />
      </div>
    </div>
  );
};

export default ChatSidebar;
