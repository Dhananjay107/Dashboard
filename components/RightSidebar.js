import { useDarkMode } from '../contexts/DarkModeContext';

const RightSidebar = () => {
  const { isDarkMode } = useDarkMode();
  const notifications = [
    {
      icon: (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "You have a bug that needs to be fixed",
      time: "Just now"
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      text: "New user registered",
      time: "59 minutes ago"
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "You have a bug that needs to be fixed",
      time: "12 hours ago"
    },
    {
      icon: (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      text: "Andi Lane subscribed to you",
      time: "Today, 11:59 AM"
    }
  ];

  const activities = [
    {
      avatar: "AL",
      avatarBg: "bg-green-100",
      text: "You have a bug that needs to be fixed",
      time: "Just now"
    },
    {
      avatar: "JH",
      avatarBg: "bg-blue-100",
      text: "Released a new version",
      time: "59 minutes ago"
    },
    {
      avatar: "SM",
      avatarBg: "bg-yellow-100",
      text: "Submitted a bug",
      time: "12 hours ago"
    },
    {
      avatar: "BD",
      avatarBg: "bg-purple-100",
      text: "Modified A data in Page X",
      time: "Today, 11:59 AM"
    },
    {
      avatar: "KG",
      avatarBg: "bg-red-100",
      text: "Deleted a page in Project X",
      time: "Feb 2, 2023"
    }
  ];

  const contacts = [
    { name: "Natali Craig", avatar: "NC", avatarBg: "bg-gray-100" },
    { name: "Drew Cano", avatar: "DC", avatarBg: "bg-red-100" },
    { name: "Orlando Diggs", avatar: "OD", avatarBg: "bg-yellow-100" },
    { name: "Andi Lane", avatar: "AL", avatarBg: "bg-green-100" },
    { name: "Kate Morrison", avatar: "KM", avatarBg: "bg-blue-100" },
    { name: "Koray Okumus", avatar: "KO", avatarBg: "bg-indigo-100" }
  ];

  return (
    <div className={`w-56 shadow-lg border-l h-full flex flex-col relative ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Fixed Header - Match Navbar Height */}
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm sticky top-0 z-10`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
      </div>
      
      {/* Overlapped Scrolling Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide relative">
        <div className="p-3">
          {/* Notifications Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-[100%] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{notification.text}</p>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activities</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-4 top-0 bottom-0 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="relative flex items-start space-x-3">
                    {/* Avatar */}
                    <div className={`relative z-10 w-8 h-8 ${activity.avatarBg} rounded-full flex items-center justify-center border-2 border-white`}>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{activity.avatar}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-[100%] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{activity.text}</p>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacts Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contacts</h3>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className={`w-8 h-8 ${contact.avatarBg} rounded-full flex items-center justify-center`}>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{contact.avatar}</span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{contact.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
