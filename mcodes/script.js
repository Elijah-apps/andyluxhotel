// Load Monaco Editor
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: [
            'function helloWorld() {',
            '\tconsole.log("Hello, world!");',
            '}'
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark'
    });

    // Make the editor resizable
    $("#editor").resizable({
        handles: "e, s, se",
        containment: "parent"
    });
});

// jQuery UI Tabs
$(function() {
    $("#tabs").tabs();

    // Make sidebar resizable
    $("#sidebar").resizable({
        handles: "e, w",
        containment: "parent"
    });

    // Make right sidebar resizable
    $("#right-sidebar").resizable({
        handles: "w",
        containment: "parent"
    });

    // Make terminal resizable
    $("#terminal").resizable({
        handles: "n, s",
        containment: "parent"
    });

    // Initialize Konva.js Drawing Board
    var stage = new Konva.Stage({
        container: 'drawing-board',
        width: $('#drawing-board').width(),
        height: $('#drawing-board').height()
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    var isDrawing = false;
    var currentTool = 'pen';

    var drawLine = function(x, y) {
        if (currentTool === 'pen') {
            var line = new Konva.Line({
                points: [x, y],
                stroke: 'black',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            });
            layer.add(line);
            layer.draw();
        }
    };

    stage.on('mousedown', function (e) {
        isDrawing = true;
        var pos = stage.getPointerPosition();
        drawLine(pos.x, pos.y);
    });

    stage.on('mousemove', function (e) {
        if (!isDrawing) return;
        var pos = stage.getPointerPosition();
        var line = layer.findOne('Line:last-child');
        if (line) {
            line.points(line.points().concat([pos.x, pos.y]));
            layer.batchDraw();
        }
    });

    stage.on('mouseup', function () {
        isDrawing = false;
    });

    // Tool Buttons
    $('#pen-tool').on('click', function() {
        currentTool = 'pen';
    });

    $('#shape-tool').on('click', function() {
        currentTool = 'shape';
    });

    // Toggle Drawing Tool
    $('#toggle-drawing-tool').on('click', function() {
        $('#drawing-tool').toggleClass('hidden');
    });

    // Resizable Drawing Tool
    $('#drawing-tool').resizable({
        handles: "e, w",
        containment: "parent"
    });
});
