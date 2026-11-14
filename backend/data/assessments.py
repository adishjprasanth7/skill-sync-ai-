"""
Assessment Question Bank and Evaluation Logic
"""

ASSESSMENT_QUESTIONS = {
    "JavaScript": [
        {
            "id": "js_1",
            "skill": "JavaScript",
            "topic": "Closures & Scoping",
            "difficulty": "Intermediate",
            "question": "What will be printed to the console when the following code executes?",
            "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}",
            "options": ["0, 1, 2", "3, 3, 3", "undefined, undefined, undefined", "0, 0, 0"],
            "correct_index": 1,
            "explanation": "Because 'var' is function-scoped (or globally scoped here) and not block-scoped, the variable 'i' is shared. By the time the setTimeout callbacks execute, the loop has completed and 'i' equals 3."
        },
        {
            "id": "js_2",
            "skill": "JavaScript",
            "topic": "Async & Promises",
            "difficulty": "Intermediate",
            "question": "Which of the following describes the execution order of microtasks vs macrotasks in the JS Event Loop?",
            "code": "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
            "options": ["1, 2, 3, 4", "1, 4, 2, 3", "1, 4, 3, 2", "1, 3, 4, 2"],
            "correct_index": 2,
            "explanation": "Synchronous code runs first ('1', '4'). Next, all microtasks in the Promise queue are drained ('3'). Finally, macrotasks like setTimeout callbacks run ('2'). Result: 1, 4, 3, 2."
        },
        {
            "id": "js_3",
            "skill": "JavaScript",
            "topic": "Object References",
            "difficulty": "Beginner",
            "question": "What is the result of comparing two distinct objects with identical properties using '==='?",
            "code": "const a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);",
            "options": ["true", "false", "TypeError", "undefined"],
            "correct_index": 1,
            "explanation": "In JavaScript, objects are compared by memory reference, not by structural value. Since 'a' and 'b' point to two different heap memory addresses, the result is false."
        },
        {
            "id": "js_4",
            "skill": "JavaScript",
            "topic": "Array Methods",
            "difficulty": "Intermediate",
            "question": "What does Array.prototype.reduce return if no initial value is provided?",
            "code": "[10, 20, 30].reduce((acc, curr) => acc + curr);",
            "options": ["NaN", "60", "TypeError", "undefined"],
            "correct_index": 1,
            "explanation": "When initialValue is omitted, reduce uses the first array element as the initial accumulator and starts iteration from the second element (index 1). Here: 10 + 20 + 30 = 60."
        }
    ],
    "React": [
        {
            "id": "react_1",
            "skill": "React",
            "topic": "Hooks & Re-rendering",
            "difficulty": "Intermediate",
            "question": "Why shouldn't you call hooks conditionally inside a component?",
            "code": "if (isLoaded) {\n  useEffect(() => { ... }, []);\n}",
            "options": [
                "React relies on hook call order across renders to match hook state",
                "It causes memory leaks in the browser heap",
                "Conditional statements cannot contain callbacks",
                "It fails TypeScript type inference"
            ],
            "correct_index": 0,
            "explanation": "React stores hook states in a linked list per component fiber. Reordering or skipping hook invocations corrupts the index alignment across renders."
        },
        {
            "id": "react_2",
            "skill": "React",
            "topic": "useCallback & Memoization",
            "difficulty": "Advanced",
            "question": "What is the primary purpose of useCallback?",
            "code": "const memoizedFn = useCallback(() => doSomething(a, b), [a, b]);",
            "options": [
                "To execute an expensive calculation asynchronously",
                "To memoize a function reference so child components don't re-render needlessly when receiving it as a prop",
                "To prevent React state updates from batching",
                "To run background worker threads in React"
            ],
            "correct_index": 1,
            "explanation": "useCallback caches the function instance between renders unless its dependencies change. This avoids re-creating fresh function pointers that trigger child re-renders."
        },
        {
            "id": "react_3",
            "skill": "React",
            "topic": "State Updates",
            "difficulty": "Intermediate",
            "question": "If setCount(c => c + 1) is called three times in the same click event handler, what is the net increment?",
            "code": "const handleClick = () => {\n  setCount(c => c + 1);\n  setCount(c => c + 1);\n  setCount(c => c + 1);\n};",
            "options": ["+1", "+3", "+0 (queued only once)", "Undefined behavior"],
            "correct_index": 1,
            "explanation": "When using updater functions (c => c + 1), React queues each updater sequentially. Even though updates are batched, each updater receives the pending state from the previous one, yielding +3."
        }
    ],
    "Python": [
        {
            "id": "py_1",
            "skill": "Python",
            "topic": "Mutable Default Arguments",
            "difficulty": "Intermediate",
            "question": "What does calling append_to([1]) followed by append_to() twice print?",
            "code": "def append_to(item, target=[]):\n    target.append(item)\n    return target\n\nprint(append_to(1))\nprint(append_to(2))",
            "options": ["[1] then [2]", "[1] then [1, 2]", "[1] then []", "TypeError"],
            "correct_index": 1,
            "explanation": "In Python, default arguments are evaluated only once when the function is defined. A mutable default like a list persists across subsequent calls, printing [1] then [1, 2]."
        },
        {
            "id": "py_2",
            "skill": "Python",
            "topic": "List Comprehensions & Generators",
            "difficulty": "Intermediate",
            "question": "What is the key difference in memory usage between `(x*2 for x in data)` and `[x*2 for x in data]`?",
            "code": "gen = (x * 2 for x in range(10_000_000))\nlst = [x * 2 for x in range(10_000_000)]",
            "options": [
                "No difference; both allocate 10 million elements immediately",
                "The generator yields items lazily on demand using O(1) memory, while the list allocates the full array in memory",
                "The list is faster and uses less memory because it's in C",
                "The generator cannot be iterated over in a loop"
            ],
            "correct_index": 1,
            "explanation": "Parentheses create a generator expression that lazily yields values one at a time with constant O(1) memory overhead, whereas square brackets allocate the full list in RAM."
        },
        {
            "id": "py_3",
            "skill": "Python",
            "topic": "GIL & Concurrency",
            "difficulty": "Advanced",
            "question": "What effect does CPython's Global Interpreter Lock (GIL) have on multi-threaded programs?",
            "code": "import threading\n# CPU-intensive calculation across 4 threads",
            "options": [
                "It allows 4 CPU cores to run Python bytecode in parallel",
                "It prevents multiple native threads from executing Python bytecodes simultaneously, restricting CPU-bound speedups",
                "It blocks network socket operations in threads",
                "It disables memory garbage collection"
            ],
            "correct_index": 1,
            "explanation": "CPython's GIL ensures only one native thread executes Python bytecode at any given moment to protect memory management. For CPU-bound tasks, multiprocessing is preferred."
        }
    ],
    "SQL": [
        {
            "id": "sql_1",
            "skill": "SQL",
            "topic": "JOIN Operations",
            "difficulty": "Beginner",
            "question": "Which JOIN returns all rows from the left table even if there are no matches in the right table?",
            "code": "SELECT u.name, o.id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;",
            "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
            "correct_index": 1,
            "explanation": "LEFT JOIN (or LEFT OUTER JOIN) preserves every record from the left table, filling in NULL for missing matching values from the right table."
        },
        {
            "id": "sql_2",
            "skill": "SQL",
            "topic": "Indexing & Query Plans",
            "difficulty": "Intermediate",
            "question": "Why does using `WHERE LOWER(email) = 'test@example.com'` prevent using a standard B-tree index on `email`?",
            "code": "CREATE INDEX idx_users_email ON users(email);\nSELECT * FROM users WHERE LOWER(email) = 'test@example.com';",
            "options": [
                "Applying a function to the indexed column prevents index lookup unless a functional/expression index is created",
                "B-tree indexes only support numeric columns",
                "LOWER() generates a syntax error in SQL",
                "Indexes are never used in WHERE clauses"
            ],
            "correct_index": 0,
            "explanation": "When an indexed column is wrapped in an expression or function like LOWER(), the database engine cannot traverse the standard index directly without a corresponding functional index."
        },
        {
            "id": "sql_3",
            "skill": "SQL",
            "topic": "Aggregation & HAVING",
            "difficulty": "Intermediate",
            "question": "What is the semantic difference between WHERE and HAVING?",
            "code": "SELECT department, COUNT(*)\nFROM employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) > 5;",
            "options": [
                "WHERE filters rows before aggregation; HAVING filters groups after aggregation",
                "HAVING is used only for sorting; WHERE is for filtering",
                "There is no difference; they are interchangeable",
                "WHERE can only be used with primary keys"
            ],
            "correct_index": 0,
            "explanation": "WHERE filters individual table rows before any GROUP BY operations occur. HAVING filters aggregated group results produced by GROUP BY."
        }
    ],
    "Docker": [
        {
            "id": "docker_1",
            "skill": "Docker & Containers",
            "topic": "Layers & Caching",
            "difficulty": "Intermediate",
            "question": "Why should `COPY package.json .` and `npm install` precede `COPY . .` in a Dockerfile?",
            "code": "COPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"npm\", \"start\"]",
            "options": [
                "To optimize Docker layer caching so npm install doesn't re-run on every source code change",
                "Docker requires package.json to be copied first by spec",
                "To reduce the Linux kernel attack surface",
                "Because RUN npm install fails if source files exist"
            ],
            "correct_index": 0,
            "explanation": "Docker caches each build step layer. Placing package.json and npm install before copying the entire source directory ensures npm install is only invalidated when dependencies change."
        }
    ]
}

def get_questions_for_skill(skill: str):
    return ASSESSMENT_QUESTIONS.get(skill, [])

def get_all_testable_skills():
    return list(ASSESSMENT_QUESTIONS.keys())

def evaluate_submission(skill: str, user_answers: dict):
    """
    user_answers: { "question_id": selected_option_index }
    """
    questions = ASSESSMENT_QUESTIONS.get(skill, [])
    if not questions:
        return {
            "skill": skill,
            "score": 0,
            "total": 0,
            "percentage": 0,
            "passed": False,
            "weak_topics": [],
            "mastered_topics": [],
            "breakdown": []
        }

    correct_count = 0
    weak_topics = []
    mastered_topics = []
    breakdown = []

    for q in questions:
        qid = q["id"]
        selected = user_answers.get(qid)
        is_correct = (selected == q["correct_index"])
        if is_correct:
            correct_count += 1
            if q["topic"] not in mastered_topics:
                mastered_topics.append(q["topic"])
        else:
            if q["topic"] not in weak_topics:
                weak_topics.append(q["topic"])

        breakdown.append({
            "id": qid,
            "topic": q["topic"],
            "question": q["question"],
            "selected_index": selected,
            "correct_index": q["correct_index"],
            "is_correct": is_correct,
            "explanation": q["explanation"]
        })

    percentage = round((correct_count / len(questions)) * 100, 1)
    passed = percentage >= 70.0

    return {
        "skill": skill,
        "score": correct_count,
        "total": len(questions),
        "percentage": percentage,
        "passed": passed,
        "weak_topics": weak_topics,
        "mastered_topics": mastered_topics,
        "breakdown": breakdown
    }
