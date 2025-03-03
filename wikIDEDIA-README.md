flowchart TD
    App[App.js] --> Router[Router.js]
    Router --> WikiPage[WikiDEDIAPage.js]
    WikiPage --> WikiSidebar[WikiSidebar.js]
    WikiPage --> WikiContent[WikiContent.js]
    WikiPage --> WikiAdmin[WikiAdminPanel.js]
    
    WikiSidebar --> ChapterList[ChapterList.js]
    WikiSidebar --> PageList[PageList.js]
    
    WikiContent --> WikiRenderer[WikiRenderer.js]
    WikiContent --> CommentSection[CommentSection.js]
    WikiContent --> SourceCitations[SourceCitations.js]
    
    WikiAdmin --> ChapterManager[ChapterManager.js]
    WikiAdmin --> PageManager[PageManager.js]
    WikiAdmin --> PendingEdits[PendingEditsReview.js]

    style WikiAdmin fill:#f96,stroke:#333
    style WikiSidebar fill:#9cf,stroke:#333
    style WikiContent fill:#9f9,stroke:#333