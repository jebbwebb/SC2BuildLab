const textArea = document.getElementById('description');
textArea.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();

    var start = this.selectionStart;
    var end = this.selectionEnd;
    var value = this.value;

    this.value = value.substring(0, start) + '\n' + value.substring(end);

    this.selectionStart = this.selectionEnd = start + 1;
  }
});
