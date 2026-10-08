import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Incident, 
  ChildProfile, 
  ParentProfile, 
  School, 
  Lesson, 
  SafetyScore, 
  SafetyAlert, 
  TrustedAdult,
  NotificationItem
} from '../types';
import { 
  INITIAL_CHILD_PROFILE, 
  INITIAL_PARENT_PROFILE, 
  INITIAL_SCHOOL, 
  INITIAL_SAFETY_SCORE, 
  INITIAL_INCIDENTS, 
  INITIAL_LESSONS, 
  INITIAL_PARENT_ALERTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentRoute: string;
  navigateTo: (route: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Child state
  childProfile: ChildProfile;
  safetyScore: SafetyScore;
  addSafetyPoints: (points: number) => void;
  completeLesson: (lessonId: string, pointsEarned: number) => void;
  addTrustedAdult: (adult: Omit<TrustedAdult, 'id'>) => void;
  removeTrustedAdult: (id: string) => void;
  
  // Incidents state
  incidents: Incident[];
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  submitReport: (newIncident: Omit<Incident, 'id' | 'date' | 'status' | 'timeline' | 'safeguardingNotes'>) => string;
  updateIncidentStatus: (id: string, status: Incident['status'], note?: string) => void;
  assignIncidentOfficer: (id: string, officer: string) => void;
  addIncidentNote: (id: string, note: string) => void;

  // Parent & School
  parentProfile: ParentProfile;
  parentAlerts: SafetyAlert[];
  markAlertRead: (id: string) => void;
  school: School;

  // Lessons
  lessons: Lesson[];

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('child');
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [childProfile, setChildProfile] = useState<ChildProfile>(INITIAL_CHILD_PROFILE);
  const [safetyScore, setSafetyScore] = useState<SafetyScore>(INITIAL_SAFETY_SCORE);
  const [parentProfile, setParentProfile] = useState<ParentProfile>(INITIAL_PARENT_PROFILE);
  const [parentAlerts, setParentAlerts] = useState<SafetyAlert[]>(INITIAL_PARENT_ALERTS);
  const [school, setSchool] = useState<School>(INITIAL_SCHOOL);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Handle URL hash routing or initial route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Auto-navigate to that role's primary dashboard if currently on a dashboard
    if (currentRoute.startsWith('/dashboard')) {
      navigateTo(`/dashboard/${newRole}`);
    }
    addToast('info', 'Active Persona Switched', `Switched view to ${newRole.toUpperCase()} mode.`);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addSafetyPoints = (points: number) => {
    setChildProfile(prev => ({
      ...prev,
      safetyPoints: prev.safetyPoints + points
    }));
    addToast('success', `+${points} Safety Points!`, 'Keep up the great work keeping digital spaces safe.');
  };

  const completeLesson = (lessonId: string, pointsEarned: number) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, isCompleted: true } : l));
    setChildProfile(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId) ? prev.completedLessons : [...prev.completedLessons, lessonId],
      safetyPoints: prev.safetyPoints + pointsEarned
    }));
    setSafetyScore(prev => {
      const newScore = Math.min(100, prev.overall + 2);
      return {
        ...prev,
        overall: newScore,
        feedback: "Awesome progress! Every completed lesson makes you more resilient online."
      };
    });
    addToast('success', 'Lesson Completed! 🎓', `Earned +${pointsEarned} Safety Points.`);
  };

  const addTrustedAdult = (adultData: Omit<TrustedAdult, 'id'>) => {
    const newAdult: TrustedAdult = {
      ...adultData,
      id: 'ta-' + Date.now()
    };
    setChildProfile(prev => ({
      ...prev,
      trustedAdults: [...prev.trustedAdults, newAdult]
    }));
    addToast('success', 'Trusted Adult Added', `${newAdult.name} added to your trusted circle.`);
  };

  const removeTrustedAdult = (id: string) => {
    setChildProfile(prev => ({
      ...prev,
      trustedAdults: prev.trustedAdults.filter(a => a.id !== id)
    }));
    addToast('info', 'Contact Removed', 'Trusted adult removed from list.');
  };

  const submitReport = (newIncidentData: Omit<Incident, 'id' | 'date' | 'status' | 'timeline' | 'safeguardingNotes'>): string => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const incidentId = `INC-UG-2026-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const incident: Incident = {
      ...newIncidentData,
      id: incidentId,
      date: today,
      status: 'New',
      safeguardingNotes: ['Report ingested into encrypted safeguarding storage. Zero public exposure.'],
      timeline: [
        {
          time: `${today} ${nowTime}`,
          title: 'Report Filed',
          description: `Filed confidentially under category: ${newIncidentData.category}.`,
          author: 'System Ingest'
        }
      ]
    };

    setIncidents(prev => [incident, ...prev]);

    // Parent notification if child reported
    if (newIncidentData.reporterRole === 'child') {
      const newAlert: SafetyAlert = {
        id: 'alt-' + Date.now(),
        title: 'Child Safety Concern Reported',
        message: `A report was lodged regarding ${newIncidentData.category} on ${newIncidentData.platform}. Check in supportively with Alex.`,
        timestamp: 'Just now',
        severity: newIncidentData.severity === 'Critical' ? 'high' : 'medium',
        childName: 'Alex Mukasa',
        type: 'bullying',
        read: false,
        discussionPrompt: "Hey Alex, I'm always here if anyone online is making you uncomfortable. You're never in trouble for talking to me."
      };
      setParentAlerts(prev => [newAlert, ...prev]);
    }

    addToast('success', 'Report Filed Confidentially', `Reference ID: ${incidentId}. A safeguarding officer will review this safely.`);
    return incidentId;
  };

  const updateIncidentStatus = (id: string, status: Incident['status'], note?: string) => {
    const now = new Date().toLocaleString();
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        const updatedTimeline = [
          ...inc.timeline,
          {
            time: now,
            title: `Status Changed to ${status}`,
            description: note || `Case progressed to ${status}.`,
            author: 'Safeguarding Desk'
          }
        ];
        return {
          ...inc,
          status,
          timeline: updatedTimeline,
          safeguardingNotes: note ? [...inc.safeguardingNotes, note] : inc.safeguardingNotes
        };
      }
      return inc;
    }));
    addToast('info', 'Status Updated', `Incident #${id} marked as ${status}.`);
  };

  const assignIncidentOfficer = (id: string, officer: string) => {
    const now = new Date().toLocaleString();
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          assignedOfficer: officer,
          timeline: [
            ...inc.timeline,
            {
              time: now,
              title: 'Officer Assigned',
              description: `Assigned to ${officer}.`,
              author: 'Admin Desk'
            }
          ]
        };
      }
      return inc;
    }));
    addToast('success', 'Officer Assigned', `${officer} assigned to ${id}.`);
  };

  const addIncidentNote = (id: string, note: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          safeguardingNotes: [...inc.safeguardingNotes, note]
        };
      }
      return inc;
    }));
    addToast('success', 'Note Appended', 'Confidential safeguarding note recorded.');
  };

  const markAlertRead = (id: string) => {
    setParentAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    addToast('info', 'Notifications Cleared', 'All notifications marked as read.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentRoute,
        navigateTo,
        theme,
        toggleTheme,
        childProfile,
        safetyScore,
        addSafetyPoints,
        completeLesson,
        addTrustedAdult,
        removeTrustedAdult,
        incidents,
        selectedIncident,
        setSelectedIncident,
        submitReport,
        updateIncidentStatus,
        assignIncidentOfficer,
        addIncidentNote,
        parentProfile,
        parentAlerts,
        markAlertRead,
        school,
        lessons,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
