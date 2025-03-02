import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, Search, Code, Database, Server, Terminal, Cpu, Plus, X, Edit, CheckCircle } from 'lucide-react';
import '../styles/styles.css';

const MasteryHubPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    codeSnippet: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  
  // Sistema di livelli di competenza
  const skillLevels = {
    JUNIOR: { label: "Junior", value: 25, color: "bg-blue-400" },
    INTERMEDIATE: { label: "Intermediate", value: 50, color: "bg-green-400" },
    ADVANCED: { label: "Advanced", value: 75, color: "bg-yellow-400" },
    EXPERT: { label: "Expert", value: 90, color: "bg-red-400" }
  };
  
  // Progetti
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Fugaku Dataset Analysis",
      description: "Machine learning on Japanese supercomputer datasets to predict energy consumption and job resource allocation through regression problems.",
      codeSnippet: "# Example of model training\nimport tensorflow as tf\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(features, targets, test_size=0.2)\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(64, activation='relu'),\n    tf.keras.layers.Dense(32, activation='relu'),\n    tf.keras.layers.Dense(1)\n])\nmodel.compile(optimizer='adam', loss='mse')\nmodel.fit(X_train, y_train, epochs=100, validation_data=(X_test, y_test))",
      tags: ["Python", "TensorFlow", "Data Analysis", "Regression"]
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Development of a portfolio website with React and TailwindCSS featuring advanced visual effects and SPA navigation.",
      codeSnippet: "// Matrix background effect\nconst MatrixEffect = () => {\n  useEffect(() => {\n    const matrix = document.querySelector('.matrix');\n    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';\n    let columns = Math.floor(window.innerWidth / 20);\n    let drops = Array(columns).fill(1);\n\n    const draw = () => {\n      // Animation logic here\n    };\n\n    const interval = setInterval(draw, 50);\n    return () => clearInterval(interval);\n  }, []);\n\n  return <div className=\"matrix\"></div>;\n};",
      tags: ["React", "TailwindCSS", "JavaScript", "Animation"]
    },
    {
      id: 3,
      title: "Mutual Exclusion System",
      description: "Implementation of algorithms to ensure mutual exclusion in distributed systems with focus on thread safety and deadlock prevention.",
      codeSnippet: "#include <pthread.h>\n#include <stdio.h>\n#include <stdlib.h>\n\npthread_mutex_t mutex;\nint counter = 0;\n\nvoid* increment(void* arg) {\n    for(int i = 0; i < 1000000; i++) {\n        pthread_mutex_lock(&mutex);\n        counter++;\n        pthread_mutex_unlock(&mutex);\n    }\n    return NULL;\n}",
      tags: ["C++", "Multithreading", "Distributed Systems", "Synchronization"]
    }
  ]);
  
  // SVG icons for skills
  const skillIcons = {
    react: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
        <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400">
        <path fill="currentColor" d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z" />
      </svg>
    ),
    html5: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-500">
        <path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-teal-400">
        <path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    java: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500">
        <path fill="currentColor" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.093-7.15 1.7-14.622 4.84-6.343 6.932 22.634 5.847 41.268-2.825 33.046-5.908M9.292 13.21s-5.545 1.335-1.96 1.82c1.508.205 4.514.159 7.013-.08 2.902-.309 4.059-.872 4.059-.872s-.713.306-1.416.646c-5.481 1.841-16.013.985-9.631-.829 5.384-1.532 8.377-.638 8.377-.638M16.952 17.003c4.941-2.902 2.803-7.579 1.119-9.654 2.832 4.264-.737 8.768-1.119 9.654M23.865 18.153c0 0 .812 2.484-9.413 4.582 0 .001-.816.503-2.008.807 11.314-3.141 9.241-9.327 3.71-9.37-1.636-.015-3.634.501-3.742.521 3.372-1.424 7.364-2.081 10.121-.835 3.07 1.385 2.685 4.295 1.332 4.295" />
      </svg>
    ),
    c: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
        <path fill="currentColor" d="M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-8.0362-.943-8.0362-11.5062 0-10.5611 6.2682-11.5601 8.1342-11.5781 8.747-.108 10.0493 8.6262 10.0493 8.6262l-6.1993.119z" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500">
        <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.2-.85 2.2-2.33V8.17c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.35c0 .66-.68 1.31-1.77.76L4.45 16.2c-.04-.02-.1-.07-.1-.12V7.34c0-.05.06-.1.1-.13l7.36-4.24c.04-.02.1-.03.15 0l7.36 4.24c.05.02.1.07.1.13v8.74c0 .05-.05.1-.1.12l-7.36 4.24c-.03.02-.12.02-.15 0l-1.89-1.12c-.08-.04-.18-.04-.25 0-.66.38-.8.46-1.42.66-.16.05-.38.16.08.47l2.48 1.47c.22.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.7c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.12-.5-.19-.78-.19M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.24 2.04 3.3 2.25 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.5-2.55-1.47a.226.226 0 0 0-.22-.18h-.9c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.88 2.74 2.32 0 3.65-.92 3.65-2.53 0-1.57-1.06-1.99-3.28-2.29-2.28-.3-2.65-.46-2.65-1.01 0-.45.2-1.05 1.98-1.05 1.59 0 2.18.34 2.44 1.4.02.09.1.16.2.16h.91c.06 0 .11-.02.15-.07.04-.04.06-.1.05-.16C17.55 8.82 16.38 8 14 8z" />
      </svg>
    ),
    spring: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400">
        <path fill="currentColor" d="M21.822 1.248c-.338.806-.828 1.63-1.32 2.292.037-.034.074-.069.11-.104a10.233 10.233 0 0 1-.403.422c-2.76 2.738-6.17 4.343-9.728 4.664.32.845.522 1.74.602 2.666 1.512.276 2.994.803 4.371 1.546a12.074 12.074 0 0 0 5.004-4.926 12.127 12.127 0 0 0 1.364-6.56zm-2.315 8.742a10.767 10.767 0 0 1-4.458 4.376 10.794 10.794 0 0 1-6.069 1.286l-.337-.033c-.329-.034-.659-.075-.984-.127l-.084-.013a10.847 10.847 0 0 1-2.594-.739l.054.02a7.076 7.076 0 0 0 5.993 3.327c4.207.0 6.38-2.12 6.38-2.12s.009-.011.024-.029a8.52 8.52 0 0 0 2.075-5.948zm-14.15-8.26c-.214.272-.551.424-.913.424s-.699-.152-.913-.424c-.21-.278-.346-.675-.346-1.112 0-.439.136-.834.346-1.112.214-.273.551-.425.913-.425s.699.152.913.425c.21.278.346.673.346 1.112 0 .437-.136.834-.346 1.112zm1.446 1.891a5.212 5.212 0 0 1-.267-.502c-.437-.959-.667-2.059-.667-3.226a8.43 8.43 0 0 1 .143-1.596 5.904 5.904 0 0 0-1.143-.111C2.474-1.288.903.612.903 2.817c0 1.93 1.233 3.58 2.948 4.172h.006c.073.025.147.05.226.07a8.8 8.8 0 0 0-.388-1.861 10.506 10.506 0 0 0 3.108-1.567zm-1.362 2.262h-.004.004z" />
        <path fill="currentColor" d="M17.303 1.45c-.006.328-.207.661-.56.661-1.002 0-1.189 1.088-1.147 1.597.192 0 .398.021.615.066 2.544.521 2.683 3.365 1.088 4.648-.37.299-.579.554-.666.647 1.3.833 4.592-.154 4.92-3.268.323-3.059-1.961-3.898-4.25-4.351z" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500">
        <path fill="currentColor" d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.21 4.859 7.21 4.859l.007 2.337h4.767V7.93H5.5s-2.03-.232-2.03 6.07c0 6.301 1.77 6.051 1.77 6.051h1.068v-2.922s-.077-2.417 2.346-2.417h.001zm-.797-5.35a.901.901 0 0 1-.895-.899c0-.494.4-.891.895-.891a.89.89 0 0 1 .891.891.897.897 0 0 1-.89.899z" />
        <path fill="currentColor" d="M14.217 19.346c0-.5.4-.891.895-.891a.89.89 0 0 1 .891.891.897.897 0 0 1-.891.898.9.9 0 0 1-.895-.898zm-3.413.783l-.007-2.336H6.03s-2.432-.039-2.432 2.35v3.951S3.962 27 8.741 27c4.574 0 4.725-1.859 4.725-1.859l-.007-2.337H8.693v-.734h6.481s2.03.232 2.03-6.07c0-6.301-1.77-6.05-1.77-6.05h-1.068v2.922s.077 2.416-2.346 2.416H9.413l4.328.001s-2.539.001-2.539 2.899z" />
      </svg>
    ),
    tensorflow: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-500">
        <path fill="currentColor" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l10.262-5.856-4.055-2.389V7.603l4.11-2.36z" />
      </svg>
    ),
    jupyter: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400">
        <path fill="currentColor" d="M12 1A11 11 0 0 0 1 12a11 11 0 0 0 11 11 11 11 0 0 0 11-11A11 11 0 0 0 12 1zm0 1.886c5.04 0 9.114 4.074 9.114 9.114 0 5.04-4.073 9.114-9.114 9.114-5.04 0-9.114-4.074-9.114-9.114C2.886 6.96 6.96 2.886 12 2.886z" />
        <path fill="currentColor" d="M7.393 7.617a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zM12 13.6a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zm6.307 2.783a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0z" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500">
        <path fill="currentColor" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
    linux: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-600">
        <path fill="currentColor" d="M12.503 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.24.24 0 0 0-.01.05c-.014.177-.06.447-.1.71-.072.501-.146 1.07-.169 1.7-.022.63.037 1.49.286 2.28 1.08 3.42 7.189 3.83 11.11 3.83 4.007 0 9.798-.38 10.851-3.83.204-.637.277-1.347.283-2.05.002-.097.002-.186.002-.23.16-2.2-1.097-3.2-2.5-4.3-.95-.73-1.1-1.2-1.5-3.2-.52-2.71-1.1-6.902-5.06-6.902z" />
        <path fill="currentColor" d="M13.465 2.112c-.038.225-.093.75.027 1.363.193.985.756 1.568 1.178 1.874.127.093.275.192.451.297.256.157.557.342.854.581.296.24.516.525.64.809.124.283.15.562.15.653.148.437.27.863.382 1.254.113.39.218.759.305 1.153.086.395.153.815.187 1.279l.01.126a.2.2 0 0 1-.036.165.208.208 0 0 1-.132.097c-.195.054-.47.105-.757.152.048.152.097.302.148.449.174.504.37 1 .573 1.457.201.458.407.873.615 1.216.214.35.413.629.556.767.708.687 1.21 1.334 1.6 1.937.39.603.672 1.16.77 1.67.103.53.037 1.004-.164 1.37-.193.363-.532.61-.895.78-.385.18-.815.251-1.252.251-.436 0-.888-.075-1.33-.23-.458-.16-.905-.397-1.308-.714a3.583 3.583 0 0 1-.903-1.176c-.22-.465-.334-.996-.288-1.596a.4.4 0 0 0-.272-.411 8.673 8.673 0 0 1-1.14-.413 3.462 3.462 0 0 0-.331-.127c-.337.381-.857.7-1.483.945-.601.234-1.296.39-2.048.46l-.016.002c-.699.066-1.345.027-1.883-.097a2.885 2.885 0 0 1-.773-.329c.146.414.27.86.367 1.33.076.38.14.771.18 1.17a.22.22 0 0 1-.062.195.235.235 0 0 1-.161.06 9.25 9.25 0 0 1-1.772-.287 5.226 5.226 0 0 1-1.784-.837 3.088 3.088 0 0 1-.75-.789 1.488 1.488 0 0 1-.283-.986c.018-.33.104-.642.225-.93.12-.289.278-.552.459-.779.356-.452.849-.832 1.483-1.105a4.97 4.97 0 0 1 .48-.201s.017-.12.05-.345c.036-.234.086-.517.15-.84.062-.324.139-.677.226-1.056.172-.754.384-1.537.629-2.304l.012-.038c.144-.46.307-.97.513-1.454.206-.487.449-.944.733-1.355.283-.41.61-.771.98-1.06.371-.289.789-.503 1.266-.582a1.994 1.994 0 0 1 .776-.3.604.604 0 0 1 .27.053.39.39 0 0 1 .16.16c.166.423.512.471.948.487.436.016.958-.004 1.443.272.1.056.19.132.274.22a1.51 1.51 0 0 1 .3.42c.09.195.15.472.15.705" />
      </svg>
    ),
  };
  
  // Skill slides con dati di presentazione aggiornati con il sistema di livelli
  const [slides, setSlides] = useState([
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Python", level: skillLevels.EXPERT, icon: skillIcons.python },
        { name: "TensorFlow", level: skillLevels.ADVANCED, icon: skillIcons.tensorflow },
        { name: "Pandas/NumPy", level: skillLevels.ADVANCED, icon: skillIcons.python },
        { name: "Scikit-Learn", level: skillLevels.INTERMEDIATE, icon: null },
        { name: "Machine Learning Models", level: skillLevels.ADVANCED, icon: null }
      ],
      description: "Development of machine learning solutions for regression and classification problems. Implementation of neural networks and data analysis with Pandas and NumPy. Experience with dataset manipulation and statistical modeling."
    },
    {
      title: "Front-End Development",
      icon: <Code size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "React", level: skillLevels.EXPERT, icon: skillIcons.react },
        { name: "JavaScript", level: skillLevels.ADVANCED, icon: skillIcons.javascript },
        { name: "HTML5/CSS3", level: skillLevels.EXPERT, icon: skillIcons.html5 },
        { name: "TailwindCSS", level: skillLevels.ADVANCED, icon: skillIcons.tailwind }
      ],
      description: "Specialized in developing modern and reactive interfaces with React.js and TailwindCSS. Creation of reusable and performance-optimized components, with particular attention to user experience and accessibility."
    },
    {
      title: "Back-End Development",
      icon: <Server size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Java", level: skillLevels.ADVANCED, icon: skillIcons.java },
        { name: "C", level: skillLevels.ADVANCED, icon: skillIcons.c },
        { name: "Node.js", level: skillLevels.INTERMEDIATE, icon: skillIcons.nodejs },
        { name: "Spring Boot", level: skillLevels.INTERMEDIATE, icon: skillIcons.spring }
      ],
      description: "Implementation of robust and scalable servers with Java and Node.js. Development of efficient and secure systems. Management of concurrency and mutual exclusion for reliable and high-performance systems."
    },
    {
      title: "Database & Data",
      icon: <Database size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "SQL (MySQL, PostgreSQL)", level: skillLevels.ADVANCED, icon: null },
        { name: "MongoDB", level: skillLevels.INTERMEDIATE, icon: null },
        { name: "Redis", level: skillLevels.JUNIOR, icon: null },
        { name: "Data Analysis", level: skillLevels.ADVANCED, icon: null },
        { name: "ETL Processes", level: skillLevels.INTERMEDIATE, icon: null }
      ],
      description: "Design and optimization of relational and NoSQL databases. Development of complex and optimized queries. Data analysis to extract meaningful insights and support data-driven decisions."
    },
    {
      title: "DevOps & Tools",
      icon: <Terminal size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "Git & GitHub", level: skillLevels.EXPERT, icon: skillIcons.git },
        { name: "Linux/Bash", level: skillLevels.ADVANCED, icon: skillIcons.linux },
        { name: "CI/CD Pipelines", level: skillLevels.INTERMEDIATE, icon: null },
        { name: "Jupyter Notebook", level: skillLevels.ADVANCED, icon: skillIcons.jupyter }
      ],
      description: "Configuration and management of development environments. Implementation of CI/CD pipelines for deployment automation. Advanced scripting with Bash for automation of repetitive tasks. Experience with Jupyter Notebook for AI development."
    },
    {
      title: "Languages & Paradigms",
      icon: <Cpu size={48} className="text-emerald-300 mb-4" />,
      skills: [
        { name: "C/C++", level: skillLevels.ADVANCED, icon: null },
        { name: "Python", level: skillLevels.EXPERT, icon: skillIcons.python },
        { name: "Java", level: skillLevels.ADVANCED, icon: skillIcons.java },
        { name: "JavaScript", level: skillLevels.ADVANCED, icon: skillIcons.javascript },
        { name: "Functional Programming", level: skillLevels.INTERMEDIATE, icon: null }
      ],
      description: "Mastery of different programming paradigms: OOP, functional and procedural. Development of optimized and thread-safe software in C/C++. Experience with design patterns and scalable software architectures."
    }
  ]);
  
  // Controllo delle preferenze di sistema al caricamento iniziale
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    updateTheme(prefersDarkMode);
  }, []);
  
  // Applica il tema al documento
  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };
  
  // Gestione navigazione tra le slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Funzione per modificare il livello di una competenza (solo per amministratore)
  const handleChangeSkillLevel = (slideIndex, skillIndex, newLevel) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].skills[skillIndex].level = newLevel;
    setSlides(updatedSlides);
  };

  // Gestione aggiunta nuovo progetto
  const handleAddProject = () => {
    setShowAddProject(true);
  };

  const handleCloseAddProject = () => {
    setShowAddProject(false);
    setNewProject({
      title: '',
      description: '',
      codeSnippet: '',
      tags: []
    });
    setNewTag('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newProject.tags.includes(newTag.trim())) {
      setNewProject({
        ...newProject,
        tags: [...newProject.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmitProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const projectToAdd = {
        id: Date.now(), // Genera un ID unico
        ...newProject
      };
      setProjects([projectToAdd, ...projects]);
      handleCloseAddProject();
    }
  };

  // Filtra i progetti in base alla ricerca
  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-white text-gray-900'}`}>
      {/* Matrix effect di background */}
      <div className="matrix"></div>
      
      {/* Header con navigazione */}
      <header className="w-full navbar-gradient py-4 px-6 flex justify-between items-center">
        <a 
          href="/" 
          className="flex items-center text-emerald-300 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-300">MasteryHub</h1>
        <div className="w-24">
          {/* Pulsante per attivare la modalità di modifica (solo per admin) */}
          <button
            onClick={() => setIsEditingSkills(!isEditingSkills)}
            className="text-emerald-300 hover:bg-emerald-900/30 p-2 rounded-lg"
            title="Edit Skills (Admin only)"
          >
            {isEditingSkills ? <CheckCircle size={20} /> : <Edit size={20} />}
          </button>
        </div>
      </header>
      
      {/* Contenitore principale presentazione */}
      <main className="container mx-auto px-4 py-8">
        {/* Titolo sezione */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-emerald-300 mb-4">My Technical Skills</h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Explore the different areas of programming and software development in which I've specialized.
          </p>
        </div>
        
        {/* Indicatori di slides */}
        <div className="flex justify-center mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-colors ${
                index === activeSlide ? 'bg-emerald-400' : 'bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Presentazione delle skills */}
        <div className="max-w-4xl mx-auto bg-neutral-800/30 rounded-xl overflow-hidden shadow-xl">
          {/* Controlli slide */}
          <div className="relative">
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600/50 hover:bg-emerald-600 p-2 rounded-full z-10 text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600/50 hover:bg-emerald-600 p-2 rounded-full z-10 text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Slide content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
                <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
                  {slides[activeSlide].icon}
                  <h3 className="text-2xl md:text-3xl text-emerald-300 mb-4">
                    {slides[activeSlide].title}
                  </h3>
                  <p className="text-emerald-100 mb-6">
                    {slides[activeSlide].description}
                  </p>
                </div>
                
                <div className="w-full md:w-1/2 md:pl-8">
                  {slides[activeSlide].skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {skill.icon && <span className="mr-2">{skill.icon}</span>}
                          <span className="text-emerald-300 font-medium">{skill.name}</span>
                        </div>
                        
                        {isEditingSkills ? (
                          <div className="flex space-x-1">
                            {Object.values(skillLevels).map((level, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleChangeSkillLevel(activeSlide, skillIndex, level)}
                                className={`px-2 py-1 rounded text-xs ${
                                  skill.level.label === level.label 
                                    ? `${level.color} text-white` 
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {level.label}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className={`text-xs px-2 py-1 rounded ${skill.level.color} text-white`}>
                            {skill.level.label}
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`${skill.level.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Numerazione slide */}
          <div className="bg-neutral-900/50 py-3 px-6 flex justify-between items-center">
            <span className="text-emerald-300">
              {activeSlide + 1} / {slides.length}
            </span>
            <div className="flex space-x-2">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`px-3 py-1 rounded ${
                    index === activeSlide 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-emerald-300 hover:bg-emerald-600/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sezione progetti correlati */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-2xl text-emerald-300 mb-4 md:mb-0">Related Projects</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Barra di ricerca */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-neutral-800/50 text-white border border-neutral-700 focus:outline-none focus:border-emerald-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-emerald-300 w-5 h-5" />
              </div>
              
              {/* Pulsante aggiungi progetto (solo per amministratori) */}
              <button
                onClick={handleAddProject}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Add Project</span>
              </button>
            </div>
          </div>
          
          {/* Lista progetti */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full bg-neutral-800/30 rounded-lg p-8 text-center">
                <p className="text-emerald-100">No projects match your search criteria.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-neutral-800/30 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                  <div className="p-6">
                    <h4 className="text-emerald-300 text-xl mb-2">{project.title}</h4>
                    <p className="text-white text-sm mb-4">
                      {project.description}
                    </p>
                    
                    {project.codeSnippet && (
                      <div className="bg-neutral-900 rounded-md p-3 mb-4 overflow-x-auto">
                        <pre className="text-emerald-100 text-xs">
                          <code>{project.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      {/* Modal per aggiungere un nuovo progetto */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-neutral-800 rounded-lg shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-emerald-300">Add New Project</h3>
              <button 
                onClick={handleCloseAddProject}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitProject(); }}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                  placeholder="Enter project title"
                  required
                />
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                  placeholder="Enter project description"
                  rows="3"
                  required
                />
              </div>
              
              {/* Code Snippet */}
              <div className="mb-4">
                <label className="block text-emerald-300 mb-2">Code Snippet (optional)</label>
                <textarea
                  value={newProject.codeSnippet}
                  onChange={(e) => setNewProject({...newProject, codeSnippet: e.target.value})}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none font-mono"
                  placeholder="// Enter some code to highlight"
                  rows="5"
                />
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <label className="block text-emerald-300 mb-2">Tags</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-grow bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:border-emerald-300 focus:outline-none"
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                {/* Display added tags */}
                <div className="flex flex-wrap gap-2">
                  {newProject.tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="bg-emerald-900/50 text-emerald-300 text-sm px-2 py-1 rounded flex items-center gap-2"
                    >
                      {tag}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-emerald-300 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseAddProject}
                  className="mr-2 px-4 py-2 border border-neutral-600 rounded-lg text-white hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="w-full mx-auto mt-12 footer-gradient">
        <div className="w-full h-full flex flex-col justify-center items-center text-white px-4 py-8 md:py-0 md:h-[150px]">
          <div className="text-center">
            <p className="text-base md:text-lg mb-2">Thanks for exploring my skills</p>
            <p className="text-xs md:text-sm">© 2025 Davide Taddia - All rights reserved</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
            <a href="/" className="hover:text-emerald-200 transition-colors">Home</a>
            <a href="#top" className="hover:text-emerald-200 transition-colors">Back to Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasteryHubPage;