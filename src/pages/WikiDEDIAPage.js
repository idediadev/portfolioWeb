/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : WikiDEDIA Page
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Book, FileText, Plus, Settings, MessageSquare, 
  Eye, Edit, Save, X, CheckCircle, AlertTriangle, Code, Link,
  FileCheck, User, Calendar, Clock, Hash, Bookmark, Search,
  ChevronDown, ChevronRight, Trash, Copy, ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/wikidedia.css';

const WikiDEDIAPage = ({ path }) => {
  // Stati principali
  const [activeChapter, setActiveChapter] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Simuliamo un utente admin per testare
  const [isEditing, setIsEditing] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState({});
  
  // Stati per l'editing
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [commentContent, setCommentContent] = useState('');
  
  // Stati per gestire nuove entità e modifiche
  const [pendingEdits, setPendingEdits] = useState([]);
  const [showNewChapterForm, setShowNewChapterForm] = useState(false);
  const [showNewPageForm, setShowNewPageForm] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageContent, setNewPageContent] = useState('# New Page\n\nStart writing content here...');
  
  // Stati per la gestione delle fonti
  const [showSourceForm, setShowSourceForm] = useState(false);
  const [newSourceReference, setNewSourceReference] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  
  // Stato per visualizzare le animazioni Python/Manim
  const [showPythonOutputs, setShowPythonOutputs] = useState({});
  
  // Dati di esempio per i capitoli e le pagine - in un'app reale sarebbero caricati da un database
  const [chapters, setChapters] = useState([
    {
      id: 'cs-fundamentals',
      title: 'Computer Science Fundamentals',
      pages: [
        {
          id: 'algorithms',
          title: 'Algorithms',
          content: `# Algorithms
          
An algorithm is a step-by-step procedure for solving a problem or accomplishing a task. In computer science, algorithms are essential for processing data, automating tasks, and solving computational problems efficiently.

## Types of Algorithms

1. **Sorting Algorithms**: Arrange elements in a certain order (bubble sort, quick sort, merge sort)
2. **Search Algorithms**: Find an element in a data structure (binary search, linear search)
3. **Graph Algorithms**: Process graph structures (Dijkstra's, BFS, DFS)
4. **Dynamic Programming**: Solve complex problems by breaking them down
5. **Greedy Algorithms**: Make locally optimal choices at each stage

## Complexity Analysis

Algorithm efficiency is measured using Big O notation:

\`\`\`
O(1) - Constant time
O(log n) - Logarithmic time
O(n) - Linear time
O(n log n) - Linearithmic time
O(n²) - Quadratic time
O(2^n) - Exponential time
\`\`\`

## Example: Binary Search

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1
\`\`\`

## Manim Visualization

\`\`\`python
from manim import *

class BinarySearchVisualization(Scene):
    def construct(self):
        # Create an array
        arr = [2, 4, 7, 10, 14, 19, 22, 25, 30, 35]
        target = 19
        
        # Create rectangles for array elements
        rects = VGroup(*[Square(side_length=1).set_fill(BLUE, opacity=0.5) for _ in arr])
        rects.arrange(RIGHT, buff=0.1)
        
        # Add numbers
        nums = VGroup(*[Text(str(n)).scale(0.5).move_to(rect.get_center()) for n, rect in zip(arr, rects)])
        
        # Display array
        self.play(Create(rects), Write(nums))
        
        # Binary search animation
        low = 0
        high = len(arr) - 1
        found = False
        
        while low <= high:
            mid = (low + high) // 2
            
            # Highlight current search range
            self.play(
                rects[low:high+1].animate.set_fill(YELLOW, opacity=0.3),
                run_time=1
            )
            
            # Highlight mid element
            self.play(
                rects[mid].animate.set_fill(GREEN, opacity=0.7),
                run_time=1
            )
            
            if arr[mid] == target:
                self.play(
                    rects[mid].animate.set_fill(GREEN, opacity=1),
                    run_time=1
                )
                found = True
                break
            elif arr[mid] < target:
                low = mid + 1
                self.play(
                    rects[:mid+1].animate.set_fill(RED, opacity=0.3),
                    run_time=1
                )
            else:
                high = mid - 1
                self.play(
                    rects[mid:].animate.set_fill(RED, opacity=0.3),
                    run_time=1
                )
        
        if not found:
            self.play(
                rects.animate.set_fill(RED, opacity=0.3),
                run_time=1
            )
\`\`\``,
          sources: [
            { 
              id: 1, 
              reference: "Cormen, Thomas H.; Leiserson, Charles E.; Rivest, Ronald L.; Stein, Clifford (2009). Introduction to Algorithms (3rd ed.). MIT Press.", 
              url: "https://mitpress.mit.edu/books/introduction-algorithms-third-edition" 
            },
            { 
              id: 2, 
              reference: "Manim Community. (2021). Manim – Mathematical Animation Framework", 
              url: "https://www.manim.community/" 
            }
          ],
          comments: [
            { 
              id: 1, 
              user: "AliceSmith", 
              content: "Great explanation of binary search! The Manim visualization is really helpful.", 
              timestamp: "2025-02-15T14:30:00Z" 
            }
          ],
          lastModified: "2025-02-10T09:15:00Z"
        },
        {
          id: 'data-structures',
          title: 'Data Structures',
          content: `# Data Structures

Data structures are specialized formats for organizing, processing, retrieving and storing data. They provide a way to manage data efficiently for various uses.

## Common Data Structures

### Arrays
Simple data structure that stores elements in contiguous memory locations.

\`\`\`python
# Basic array in Python (list)
arr = [1, 2, 3, 4, 5]
print(arr[2])  # Access element: 3
arr[2] = 10    # Modify element
\`\`\`

### Linked Lists
Collection of nodes where each node contains data and a reference to the next node.

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
\`\`\`

### Stacks & Queues
- **Stack**: LIFO (Last In, First Out)
- **Queue**: FIFO (First In, First Out)

### Trees
Hierarchical data structure with a root value and subtrees of children.

\`\`\`python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
\`\`\`

### Graphs
Collection of nodes (vertices) connected by edges.

## Manim Visualization of a Binary Search Tree

\`\`\`python
from manim import *

class BSTVisualization(Scene):
    def construct(self):
        # Create tree nodes
        nodes = {}
        values = [10, 5, 15, 2, 7, 12, 20]
        
        # Build tree
        root = None
        for value in values:
            if root is None:
                root = TreeNode(value)
            else:
                self.insert(root, value)
                
        # Create visual representation
        visual_tree = self.create_visual_tree(root)
        
        # Show the tree
        self.play(Create(visual_tree))
        
    def insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self.insert(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self.insert(node.right, value)
                
    def create_visual_tree(self, root, pos=ORIGIN, level=0):
        if root is None:
            return VGroup()
            
        # Create circle with text for this node
        circle = Circle(radius=0.5).set_fill(BLUE, opacity=0.5)
        text = Text(str(root.value)).scale(0.5)
        node_visual = VGroup(circle, text).move_to(pos)
        
        # Create left and right children
        left_visual = VGroup()
        right_visual = VGroup()
        
        if root.left:
            left_pos = pos + DOWN + LEFT * (2 / (level + 1))
            left_visual = self.create_visual_tree(root.left, left_pos, level + 1)
            line_left = Line(pos, left_pos)
            left_visual.add(line_left)
            
        if root.right:
            right_pos = pos + DOWN + RIGHT * (2 / (level + 1))
            right_visual = self.create_visual_tree(root.right, right_pos, level + 1)
            line_right = Line(pos, right_pos)
            right_visual.add(line_right)
            
        return VGroup(node_visual, left_visual, right_visual)


class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
\`\`\``,
          sources: [
            { 
              id: 1, 
              reference: "Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2013). Data Structures and Algorithms in Python. Wiley.", 
              url: "https://www.wiley.com/en-us/Data+Structures+and+Algorithms+in+Python-p-9781118290279" 
            }
          ],
          comments: [],
          lastModified: "2025-02-08T11:25:00Z"
        }
      ]
    },
    {
      id: 'programming-languages',
      title: 'Programming Languages',
      pages: [
        {
          id: 'python',
          title: 'Python',
          content: `# Python Programming Language

Python is a high-level, interpreted programming language known for its readability and versatility. Created by Guido van Rossum and first released in 1991, Python has become one of the most popular programming languages in the world.

## Key Features

1. **Easy to Learn and Read**: Uses indentation and a clean syntax
2. **Interpreted**: No compilation needed
3. **Dynamically Typed**: Variable types are determined at runtime
4. **Multi-paradigm**: Supports procedural, object-oriented, and functional programming
5. **Extensive Standard Library**: "Batteries included" philosophy
6. **Rich Ecosystem**: Numerous third-party packages for various applications

## Basic Syntax

\`\`\`python
# Hello World
print("Hello, World!")

# Variables and types
name = "Alice"    # string
age = 30          # integer
height = 5.7      # float
is_student = True # boolean

# Control structures
if age > 18:
    print("Adult")
else:
    print("Minor")

# Loops
for i in range(5):
    print(i)

# Functions
def greet(name):
    return f"Hello, {name}!"

# Lists
fruits = ["apple", "banana", "cherry"]
fruits.append("date")

# Dictionaries
person = {
    "name": "Bob",
    "age": 25,
    "occupation": "engineer"
}
\`\`\`

## Python for Data Science

Python has become the primary language for data science and machine learning, with libraries like:

- **NumPy**: Numerical computing
- **pandas**: Data analysis and manipulation
- **Matplotlib/Seaborn**: Data visualization
- **scikit-learn**: Machine learning
- **TensorFlow/PyTorch**: Deep learning

## Python for Visualization with Manim

Manim is a mathematical animation engine created by Grant Sanderson (3Blue1Brown) for creating explanatory math videos.

\`\`\`python
from manim import *

class SquareToCircle(Scene):
    def construct(self):
        # Create objects
        square = Square(side_length=2, color=BLUE)
        circle = Circle(radius=1, color=RED)
        
        # Display square
        self.play(Create(square))
        
        # Transform square to circle
        self.play(Transform(square, circle))
        
        # Fade out
        self.play(FadeOut(square))
\`\`\`

## Web Development with Python

Python is also widely used for web development through frameworks like:

- **Django**: Full-featured web framework
- **Flask**: Lightweight web framework
- **FastAPI**: Modern API framework with high performance

## Future of Python

Python continues to evolve, with ongoing improvements in:
- Performance (JIT compilation)
- Type hinting
- Concurrency and parallelism
- Integration with other languages and systems`,
          sources: [
            { 
              id: 1, 
              reference: "Van Rossum, G., & Drake, F. L. (2009). Python 3 Reference Manual. CreateSpace.", 
              url: "https://docs.python.org/3/reference/" 
            },
            { 
              id: 2, 
              reference: "McKinney, W. (2017). Python for Data Analysis (2nd ed.). O'Reilly Media.", 
              url: "https://www.oreilly.com/library/view/python-for-data/9781491957653/" 
            }
          ],
          comments: [
            { 
              id: 1, 
              user: "JohnDoe", 
              content: "I'm learning Python and this page has been very helpful as an overview!", 
              timestamp: "2025-02-20T10:45:00Z" 
            },
            { 
              id: 2, 
              user: "PyEnthusiast", 
              content: "Could you add more examples of using Python with Manim?", 
              timestamp: "2025-02-22T16:20:00Z" 
            }
          ],
          lastModified: "2025-02-18T14:30:00Z"
        }
      ]
    }
  ]);

  // Estrae i parametri dal percorso per determinare capitolo e pagina attivi
  useEffect(() => {
    const pathParts = path ? path.split('/').filter(part => part) : [];
    
    // Il primo elemento dopo 'wikidedia' dovrebbe essere l'ID del capitolo
    if (pathParts.length > 1) {
      const chapterID = pathParts[1];
      const foundChapter = chapters.find(c => c.id === chapterID);
      
      if (foundChapter) {
        setActiveChapter(foundChapter);
        setExpandedChapters({...expandedChapters, [foundChapter.id]: true});
        
        // Il secondo elemento dovrebbe essere l'ID della pagina
        if (pathParts.length > 2) {
          const pageID = pathParts[2];
          const page = foundChapter.pages.find(p => p.id === pageID);
          if (page) {
            setActivePage(page);
            setEditTitle(page.title);
            setEditContent(page.content);
          }
        } else if (foundChapter.pages.length > 0) {
          // Se c'è solo l'ID del capitolo, seleziona la prima pagina
          setActivePage(foundChapter.pages[0]);
          setEditTitle(foundChapter.pages[0].title);
          setEditContent(foundChapter.pages[0].content);
        }
      }
    } else {
      // Se siamo solo su /wikidedia, seleziona il primo capitolo e la prima pagina
      if (chapters.length > 0) {
        setActiveChapter(chapters[0]);
        setExpandedChapters({...expandedChapters, [chapters[0].id]: true});
        
        if (chapters[0].pages.length > 0) {
          setActivePage(chapters[0].pages[0]);
          setEditTitle(chapters[0].pages[0].title);
          setEditContent(chapters[0].pages[0].content);
        }
      }
    }
  }, [path, chapters]);

  // Gestione delle preferenze di sistema al caricamento iniziale
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

  // Funzione per espandere/comprimere un capitolo
  const toggleChapter = (chapterId) => {
    setExpandedChapters({
      ...expandedChapters,
      [chapterId]: !expandedChapters[chapterId]
    });
  };

  // Funzione per navigare a una pagina
  const navigateToPage = (chapterId, pageId) => {
    window.history.pushState(null, '', `/wikidedia/${chapterId}/${pageId}`);
    
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter) {
      setActiveChapter(chapter);
      setExpandedChapters({...expandedChapters, [chapter.id]: true});
      
      const page = chapter.pages.find(p => p.id === pageId);
      if (page) {
        setActivePage(page);
        setEditTitle(page.title);
        setEditContent(page.content);
        setIsEditing(false);
      }
    }
  };

  // Funzione per creare un nuovo capitolo
  const handleCreateChapter = () => {
    if (!newChapterTitle.trim()) return;
    
    const newChapterId = `chapter-${Date.now()}`;
    const newChapter = {
      id: newChapterId,
      title: newChapterTitle,
      pages: []
    };
    
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
    setActiveChapter(newChapter);
    setActivePage(null);
    setExpandedChapters({...expandedChapters, [newChapterId]: true});
    setShowNewChapterForm(false);
    setNewChapterTitle('');
    
    // Aggiorna l'URL
    window.history.pushState(null, '', `/wikidedia/${newChapterId}`);
  };

  // Funzione per creare una nuova pagina
  const handleCreatePage = () => {
    if (!activeChapter || !newPageTitle.trim()) return;
    
    const newPageId = `page-${Date.now()}`;
    const newPage = {
      id: newPageId,
      title: newPageTitle,
      content: newPageContent,
      sources: [],
      comments: [],
      lastModified: new Date().toISOString()
    };
    
    const updatedChapter = {
      ...activeChapter,
      pages: [...activeChapter.pages, newPage]
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === activeChapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    setActiveChapter(updatedChapter);
    setActivePage(newPage);
    setEditTitle(newPage.title);
    setEditContent(newPage.content);
    setShowNewPageForm(false);
    setNewPageTitle('');
    setNewPageContent('# New Page\n\nStart writing content here...');
    setIsEditing(true);
    
    // Aggiorna l'URL
    window.history.pushState(null, '', `/wikidedia/${activeChapter.id}/${newPageId}`);
  };

  // Funzione per salvare le modifiche alla pagina (admin)
  const handleSaveEdit = () => {
    if (!activePage || !activeChapter) return;
    
    const updatedPage = {
      ...activePage,
      title: editTitle,
      content: editContent,
      lastModified: new Date().toISOString()
    };
    
    const updatedChapter = {
      ...activeChapter,
      pages: activeChapter.pages.map(p => 
        p.id === activePage.id ? updatedPage : p
      )
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === activeChapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    setActiveChapter(updatedChapter);
    setActivePage(updatedPage);
    setIsEditing(false);
    
    // Se il titolo è cambiato, aggiorna l'URL
    if (updatedPage.title !== activePage.title) {
      window.history.pushState(null, '', `/wikidedia/${activeChapter.id}/${activePage.id}`);
    }
  };

  // Funzione per annullare le modifiche
  const handleCancelEdit = () => {
    if (activePage) {
      setEditTitle(activePage.title);
      setEditContent(activePage.content);
    }
    setIsEditing(false);
  };

  // Funzione per aggiungere un commento
  const handleAddComment = () => {
    if (!activePage || !commentContent.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: "CurrentUser", // In un'app reale, questo verrebbe dall'utente autenticato
      content: commentContent,
      timestamp: new Date().toISOString()
    };
    
    const updatedPage = {
      ...activePage,
      comments: [...activePage.comments, newComment]
    };
    
    const updatedChapter = {
      ...activeChapter,
      pages: activeChapter.pages.map(p => 
        p.id === activePage.id ? updatedPage : p
      )
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === activeChapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    setActiveChapter(updatedChapter);
    setActivePage(updatedPage);
    setCommentContent('');
  };

  // Funzione per proporre una modifica (utente non admin)
  const handleProposeEdit = () => {
    if (!activePage || editContent === activePage.content || !isAdmin) return;
    
    const newEdit = {
      id: Date.now(),
      pageId: activePage.id,
      chapterId: activeChapter.id,
      pageTitle: activePage.title,
      user: "CurrentUser", // In un'app reale, questo verrebbe dall'utente autenticato
      originalContent: activePage.content,
      proposedContent: editContent,
      timestamp: new Date().toISOString(),
      status: "pending"
    };
    
    setPendingEdits([...pendingEdits, newEdit]);
    setIsEditing(false);
    setEditContent(activePage.content); // Ripristina il contenuto originale
    alert("Your edit has been submitted for approval.");
  };

  // Funzione per approvare una modifica (admin)
  const handleApproveEdit = (editId) => {
    const edit = pendingEdits.find(e => e.id === editId);
    if (!edit) return;
    
    // Trova il capitolo e la pagina
    const chapter = chapters.find(c => c.id === edit.chapterId);
    if (!chapter) return;
    
    const page = chapter.pages.find(p => p.id === edit.pageId);
    if (!page) return;
    
    // Aggiorna il contenuto della pagina
    const updatedPage = {
      ...page,
      content: edit.proposedContent,
      lastModified: new Date().toISOString()
    };
    
    const updatedChapter = {
      ...chapter,
      pages: chapter.pages.map(p => 
        p.id === page.id ? updatedPage : p
      )
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === chapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    
    // Se la pagina attiva è quella aggiornata, aggiorna anche quella
    if (activePage && activePage.id === page.id) {
      setActivePage(updatedPage);
      setEditContent(edit.proposedContent);
    }
    
    // Rimuovi la modifica dalla lista delle modifiche in attesa
    setPendingEdits(pendingEdits.filter(e => e.id !== editId));
  };

  // Funzione per rifiutare una modifica (admin)
  const handleRejectEdit = (editId) => {
    setPendingEdits(pendingEdits.filter(e => e.id !== editId));
  };

  // Funzione per aggiungere una fonte
  const handleAddSource = () => {
    if (!activePage || !newSourceReference.trim()) return;
    
    const newSource = {
      id: (activePage.sources.length > 0 ? Math.max(...activePage.sources.map(s => s.id)) + 1 : 1),
      reference: newSourceReference,
      url: newSourceUrl
    };
    
    const updatedPage = {
      ...activePage,
      sources: [...activePage.sources, newSource]
    };
    
    const updatedChapter = {
      ...activeChapter,
      pages: activeChapter.pages.map(p => 
        p.id === activePage.id ? updatedPage : p
      )
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === activeChapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    setActiveChapter(updatedChapter);
    setActivePage(updatedPage);
    setShowSourceForm(false);
    setNewSourceReference('');
    setNewSourceUrl('');
  };

  // Funzione per rimuovere una fonte
  const handleRemoveSource = (sourceId) => {
    if (!activePage) return;
    
    const updatedPage = {
      ...activePage,
      sources: activePage.sources.filter(s => s.id !== sourceId)
    };
    
    const updatedChapter = {
      ...activeChapter,
      pages: activeChapter.pages.map(p => 
        p.id === activePage.id ? updatedPage : p
      )
    };
    
    const updatedChapters = chapters.map(c => 
      c.id === activeChapter.id ? updatedChapter : c
    );
    
    setChapters(updatedChapters);
    setActiveChapter(updatedChapter);
    setActivePage(updatedPage);
  };

  // Funzione per attivare/disattivare l'output di una visualizzazione Python/Manim
  const togglePythonOutput = (blockId) => {
    setShowPythonOutputs({
      ...showPythonOutputs,
      [blockId]: !showPythonOutputs[blockId]
    });
  };

  // Componente per il rendering del contenuto delle pagine
  const WikiContentRenderer = ({ content, sources = [] }) => {
    // Funzione per simulare l'output di animazioni Manim
    const simulateManimOutput = (code) => {
      return "Animation rendering is simulated. In a production environment, this would generate and display the actual animation.";
    };
    
    // Componente personalizzato per il rendering dei blocchi di codice
    const CodeBlock = ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match && match[1] ? match[1] : '';
      const codeString = String(children).replace(/\n$/, '');
      
      // Gestione specifica per il codice Python con Manim
      if (language === 'python' && codeString.includes('manim')) {
        const blockId = `manim-block-${Math.random().toString(36).substr(2, 9)}`;
        
        return (
          <div className="wiki-code-block manim-block">
            <div className="wiki-code-header">
              <span className="wiki-code-language">Python with Manim</span>
              <button 
                className="wiki-code-run"
                onClick={() => togglePythonOutput(blockId)}
              >
                {showPythonOutputs[blockId] ? 'Hide Output' : 'Run Visualization'}
              </button>
            </div>
            
            <SyntaxHighlighter
              style={vscDarkPlus}
              language="python"
              className="wiki-code"
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
            
            {showPythonOutputs[blockId] && (
              <div className="wiki-code-output">
                <h4 className="text-emerald-300 mb-4">Visualization Output:</h4>
                <div className="wiki-manim-output">
                  <div className="wiki-manim-animation">
                    {/* Placeholder per l'animazione - in produzione verrebbe sostituito con l'output reale */}
                    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                      <rect width="800" height="450" fill="#111" />
                      
                      {/* Array visualization */}
                      <g transform="translate(100, 100)">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                          <g key={i} transform={`translate(${i * 60}, 0)`}>
                            <rect 
                              x="0" 
                              y="0" 
                              width="50" 
                              height="50" 
                              fill={i === 5 ? "#00ff7f" : "#1e3a8a"} 
                              fillOpacity={i === 5 ? "1" : "0.5"}
                              stroke="#00ff7f" 
                              strokeWidth="2"
                            />
                            <text 
                              x="25" 
                              y="30" 
                              fill="white" 
                              fontSize="16" 
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              {[2, 4, 7, 10, 14, 19, 22, 25, 30, 35][i]}
                            </text>
                          </g>
                        ))}
                      </g>
                      
                      {/* Animation step description */}
                      <text x="400" y="220" fill="#00ff7f" fontSize="18" textAnchor="middle">
                        Target 19 found at index 5
                      </text>
                      
                      {/* Explanation */}
                      <g transform="translate(100, 300)">
                        <text x="0" y="0" fill="white" fontSize="16">
                          Binary search completed in 4 steps
                        </text>
                        <text x="0" y="30" fill="white" fontSize="16">
                          Initial search range: [0-9], Mid: 4, Value: 14
                        </text>
                        <text x="0" y="60" fill="white" fontSize="16">
                          14 &lt; 19, new range: [5-9], Mid: 7, Value: 25
                        </text>
                        <text x="0" y="90" fill="white" fontSize="16">
                          25 &gt; 19, new range: [5-6], Mid: 5, Value: 19
                        </text>
                        <text x="0" y="120" fill="white" fontSize="16">
                          Found! Target 19 at index 5
                        </text>
                      </g>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    {simulateManimOutput(codeString)}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      }
      
      // Rendering standard per altri blocchi di codice
      return !inline && match ? (
        <div className="wiki-code-block">
          <div className="wiki-code-header">
            <span className="wiki-code-language">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={language}
            className="wiki-code"
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="wiki-inline-code" {...props}>
          {children}
        </code>
      );
    };
    
    // Componente per gestire le citazioni di fonti
    const Citation = ({ children, sourceId }) => {
      const source = sources.find(s => s.id === parseInt(sourceId));
      
      if (!source) return null;
      
      return (
        <sup 
          className="wiki-citation" 
          data-citation={source.reference}
          title={source.reference}
        >
          [{sourceId}]
        </sup>
      );
    };
    
    // Componente per il rendering dei link
    const LinkRenderer = ({ node, href, children, ...props }) => {
      // Controllo se il link è una citazione speciale (formato: [citation:ID])
      if (href && href.startsWith('citation:')) {
        const sourceId = href.replace('citation:', '');
        return <Citation sourceId={sourceId}>{children}</Citation>;
      }
      
      // Altrimenti renderizza un link normale
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    };
    
    // Rendering del markdown con i componenti personalizzati
    return (
      <div className="wiki-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code: CodeBlock,
            a: LinkRenderer
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // Interfaccia utente principale
  return (
    <div className={`wiki-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header principale */}
      <header className="wiki-header">
        <a href="/" className="wiki-back-button">
          <ArrowLeft className="wiki-back-icon" size={20} />
          <span>Back to Home</span>
        </a>
        <h1 className="wiki-title">WikIDEDIA</h1>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="wiki-page-action"
              title="Admin Panel"
            >
              <Settings size={20} className="wiki-page-action-icon" />
              <span>Admin</span>
            </button>
          )}
          {pendingEdits.length > 0 && isAdmin && (
            <div className="relative">
              <AlertTriangle size={20} className="text-yellow-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {pendingEdits.length}
              </span>
            </div>
          )}
        </div>
      </header>
      
      {/* Contenitore principale */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar di navigazione */}
        <aside className="wiki-sidebar">
          <div className="wiki-sidebar-header">
            <h2 className="wiki-sidebar-title">Chapters</h2>
            <button
              onClick={() => setShowNewChapterForm(true)}
              className="wiki-add-chapter"
              title="Add New Chapter"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Form per aggiungere un nuovo capitolo */}
          {showNewChapterForm && (
            <div className="wiki-edit-form mb-4 p-3 bg-gray-800 rounded-md">
              <div className="wiki-edit-field">
                <label className="wiki-edit-label">Chapter Title</label>
                <input
                  type="text"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  className="wiki-edit-input"
                  placeholder="Enter chapter title"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNewChapterForm(false)}
                  className="wiki-edit-cancel"
                >
                  <X size={16} className="wiki-edit-icon" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleCreateChapter}
                  className="wiki-edit-save"
                  disabled={!newChapterTitle.trim()}
                >
                  <Save size={16} className="wiki-edit-icon" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Lista dei capitoli */}
          <ul className="wiki-chapter-list">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="wiki-chapter">
                <div 
                  className={`wiki-chapter-header ${activeChapter?.id === chapter.id ? 'active' : ''}`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="wiki-chapter-title">
                    {expandedChapters[chapter.id] ? 
                      <ChevronDown size={16} className="wiki-chapter-icon" /> :
                      <ChevronRight size={16} className="wiki-chapter-icon" />
                    }
                    <span>{chapter.title}</span>
                  </div>
                </div>
                
                {expandedChapters[chapter.id] && (
                  <>
                    {chapter.pages.length > 0 && (
                      <ul className="wiki-page-list">
                        {chapter.pages.map((page) => (
                          <li key={page.id} className="wiki-page-item">
                            <div 
                              className={`wiki-page-link ${activePage?.id === page.id ? 'active' : ''}`}
                              onClick={() => navigateToPage(chapter.id, page.id)}
                            >
                              <FileText size={14} className="wiki-page-icon" />
                              <span>{page.title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {isAdmin && activeChapter?.id === chapter.id && (
                      <div
                        className="wiki-add-page"
                        onClick={() => setShowNewPageForm(true)}
                      >
                        <Plus size={14} className="wiki-add-page-icon" />
                        <span>Add Page</span>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          
          {/* Form per aggiungere una nuova pagina */}
          {showNewPageForm && activeChapter && (
            <div className="wiki-edit-form mt-4 p-3 bg-gray-800 rounded-md">
              <div className="wiki-edit-field">
                <label className="wiki-edit-label">Page Title</label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="wiki-edit-input"
                  placeholder="Enter page title"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => setShowNewPageForm(false)}
                  className="wiki-edit-cancel"
                >
                  <X size={16} className="wiki-edit-icon" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleCreatePage}
                  className="wiki-edit-save"
                  disabled={!newPageTitle.trim()}
                >
                  <Save size={16} className="wiki-edit-icon" />
                  <span>Create</span>
                </button>
              </div>
            </div>
          )}
        </aside>
        
        {/* Contenuto principale */}
        <main className="wiki-content-area">
          {activePage ? (
            <div className="wiki-page-content">
              {/* Header della pagina */}
              <div className="wiki-page-header">
                <h2 className="wiki-page-title">{activePage.title}</h2>
                <div className="wiki-page-actions">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="wiki-page-action"
                    >
                      <Edit size={16} className="wiki-page-action-icon" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <>
                      {isAdmin ? (
                        <button
                          onClick={handleSaveEdit}
                          className="wiki-page-action"
                        >
                          <Save size={16} className="wiki-page-action-icon" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleProposeEdit}
                          className="wiki-page-action"
                          style={{ backgroundColor: 'rgba(255, 204, 0, 0.1)', borderColor: '#fc0' }}
                        >
                          <FileCheck size={16} className="wiki-page-action-icon" />
                          <span>Propose Edit</span>
                        </button>
                      )}
                      
                      <button
                        onClick={handleCancelEdit}
                        className="wiki-page-action"
                        style={{ backgroundColor: 'rgba(255, 99, 71, 0.1)', borderColor: '#ff6347' }}
                      >
                        <X size={16} className="wiki-page-action-icon" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Contenuto della pagina */}
              {isEditing ? (
                <div className="wiki-edit-form">
                  <div className="wiki-edit-field">
                    <label className="wiki-edit-label">Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="wiki-edit-input"
                    />
                  </div>
                  <div className="wiki-edit-field">
                    <label className="wiki-edit-label">Content (Markdown)</label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="wiki-edit-textarea"
                      rows={20}
                    />
                  </div>
                </div>
              ) : (
                <WikiContentRenderer 
                  content={activePage.content} 
                  sources={activePage.sources}
                />
              )}
              
              {/* Sezione fonti */}
              {!isEditing && activePage.sources && activePage.sources.length > 0 && (
                <div className="wiki-sources">
                  <h3 className="wiki-sources-title">Sources</h3>
                  <ul className="wiki-sources-list">
                    {activePage.sources.map((source) => (
                      <li key={source.id} className="wiki-source-item">
                        <span className="wiki-source-number">[{source.id}]</span>
                        <div className="wiki-source-content">
                          {source.reference}
                          {source.url && (
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="wiki-source-link"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => handleRemoveSource(source.id)}
                            className="wiki-sources-action ml-2"
                            title="Remove Source"
                          >
                            <Trash size={14} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  {isAdmin && !showSourceForm && (
                    <button 
                      onClick={() => setShowSourceForm(true)}
                      className="wiki-page-action mt-4"
                    >
                      <Plus size={16} className="wiki-page-action-icon" />
                      <span>Add Source</span>
                    </button>
                  )}
                  
                  {isAdmin && showSourceForm && (
                    <div className="wiki-edit-form mt-4 p-4 bg-gray-800 rounded-md">
                      <div className="wiki-edit-field">
                        <label className="wiki-edit-label">Reference</label>
                        <input
                          type="text"
                          value={newSourceReference}
                          onChange={(e) => setNewSourceReference(e.target.value)}
                          className="wiki-edit-input"
                          placeholder="Author, Title, Year, etc."
                        />
                      </div>
                      <div className="wiki-edit-field">
                        <label className="wiki-edit-label">URL (optional)</label>
                        <input
                          type="text"
                          value={newSourceUrl}
                          onChange={(e) => setNewSourceUrl(e.target.value)}
                          className="wiki-edit-input"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setShowSourceForm(false)}
                          className="wiki-edit-cancel"
                        >
                          <X size={16} className="wiki-edit-icon" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleAddSource}
                          className="wiki-edit-save"
                          disabled={!newSourceReference.trim()}
                        >
                          <Save size={16} className="wiki-edit-icon" />
                          <span>Add Source</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Sezione commenti */}
              <div className="wiki-comments">
                <h3 className="wiki-comments-title">
                  <MessageSquare size={20} className="wiki-comments-icon" />
                  <span>Comments</span>
                </h3>
                
                {activePage.comments && activePage.comments.length > 0 ? (
                  <div className="wiki-comments-list">
                    {activePage.comments.map((comment) => (
                      <div key={comment.id} className="wiki-comment">
                        <div className="wiki-comment-header">
                          <span className="wiki-comment-author">{comment.user}</span>
                          <span className="wiki-comment-date">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="wiki-comment-content">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 mb-4">No comments yet. Be the first to comment!</p>
                )}
                
                {/* Form per aggiungere un commento */}
                <div className="wiki-comment-form">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="wiki-comment-textarea"
                    rows={3}
                  ></textarea>
                  <button
                    onClick={handleAddComment}
                    disabled={!commentContent.trim()}
                    className={`wiki-comment-submit ${
                      !commentContent.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <MessageSquare size={16} className="wiki-comment-submit-icon" />
                    <span>Add Comment</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="wiki-empty-state">
              <div className="wiki-empty-state-icon">📚</div>
              <h2 className="wiki-empty-state-title">Welcome to WikIDEDIA</h2>
              <p className="wiki-empty-state-text">
                Select a chapter and page from the sidebar to start exploring, or create your own chapter and pages.
              </p>
              {chapters.length === 0 && isAdmin && (
                <button
                  onClick={() => setShowNewChapterForm(true)}
                  className="wiki-empty-state-button"
                >
                  Create First Chapter
                </button>
              )}
            </div>
          )}
        </main>
        
        {/* Pannello amministratore (se attivo) */}
        {showAdminPanel && isAdmin && (
          <aside className="wiki-admin-panel">
            <div className="wiki-admin-header">
              <h2 className="wiki-admin-title">
                <Settings size={20} className="wiki-admin-icon" />
                <span>Admin Panel</span>
              </h2>
            </div>
            
            {/* Modifiche in attesa di approvazione */}
            {pendingEdits.length > 0 ? (
              <div className="wiki-admin-section">
                <h3 className="wiki-admin-section-title">
                  <AlertTriangle size={16} className="wiki-admin-section-icon" />
                  <span>Pending Edits ({pendingEdits.length})</span>
                </h3>
                
                <div className="space-y-3">
                  {pendingEdits.map((edit) => {
                    const chapter = chapters.find(c => c.id === edit.chapterId);
                    const page = chapter?.pages.find(p => p.id === edit.pageId);
                    
                    return (
                      <div key={edit.id} className="wiki-pending-edit">
                        <div className="wiki-pending-edit-title">
                          {chapter?.title} / {page?.title}
                        </div>
                        <div className="wiki-pending-edit-info">
                          <User size={14} className="inline mr-1" />
                          <span className="mr-3">{edit.user}</span>
                          <Clock size={14} className="inline mr-1" />
                          <span>{new Date(edit.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="wiki-pending-edit-actions">
                          <button
                            onClick={() => handleApproveEdit(edit.id)}
                            className="wiki-pending-edit-approve"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectEdit(edit.id)}
                            className="wiki-pending-edit-reject"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => {
                              // Visualizza le modifiche in un modo più dettagliato
                              alert(`Original:\n${edit.originalContent.slice(0, 100)}...\n\nProposed:\n${edit.proposedContent.slice(0, 100)}...`);
                            }}
                            className="wiki-pending-edit-view"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="wiki-admin-section">
                <p className="text-gray-400">No pending edits to approve.</p>
              </div>
            )}
            
            {/* Gestione dei capitoli e delle pagine */}
            <div className="wiki-admin-section">
              <h3 className="wiki-admin-section-title">
                <Book size={16} className="wiki-admin-section-icon" />
                <span>Content Management</span>
              </h3>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setShowNewChapterForm(true)}
                  className="wiki-page-action w-full justify-center"
                >
                  <Plus size={16} className="wiki-page-action-icon" />
                  <span>New Chapter</span>
                </button>
                
                {activeChapter && (
                  <button 
                    onClick={() => setShowNewPageForm(true)}
                    className="wiki-page-action w-full justify-center"
                  >
                    <Plus size={16} className="wiki-page-action-icon" />
                    <span>New Page</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Sezione per l'aggiunta di fonti */}
            {activePage && (
              <div className="wiki-admin-section">
                <h3 className="wiki-admin-section-title">
                  <Link size={16} className="wiki-admin-section-icon" />
                  <span>Source Management</span>
                </h3>
                
                <button 
                  onClick={() => setShowSourceForm(true)}
                  className="wiki-page-action w-full justify-center"
                >
                  <Plus size={16} className="wiki-page-action-icon" />
                  <span>Add Source</span>
                </button>
                
                {activePage.sources && activePage.sources.length > 0 && (
                  <table className="wiki-sources-table mt-3">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Reference</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePage.sources.map((source) => (
                        <tr key={source.id}>
                          <td>[{source.id}]</td>
                          <td>{source.reference.slice(0, 30)}...</td>
                          <td>
                            <button 
                              onClick={() => handleRemoveSource(source.id)}
                              className="wiki-sources-action"
                              title="Remove Source"
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default WikiDEDIAPage;