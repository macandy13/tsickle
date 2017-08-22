import * as ts from 'typescript';
import * as jsdoc from './jsdoc';

const FILEOVERVIEW_COMMENTS: ReadonlySet<string> =
    new Set(['fileoverview', 'externs', 'modName', 'mods', 'pintomodule']);

function skipLeadingCommentsRecursively(n: ts.SourceFile) {
  const start = n.getFullStart();
  function skipLeadingComments(n: ts.Node) {
    if (n.getFullStart() > start) return;
    ts.setEmitFlags(n, ts.EmitFlags.NoLeadingComments);
    ts.forEachChild(n, skipLeadingComments);
  }
  ts.forEachChild(n, skipLeadingComments);
}

export function transformFileoverviewComment(context: ts.TransformationContext) {
  return (sf: ts.SourceFile) => {
    const comments = ts.getLeadingCommentRanges(sf.getFullText(), 0) || [];

    let fileoverviewIdx = -1;
    for (let i = comments.length - 1; i >= 0; i--) {
      const parsed = jsdoc.parse(sf.getFullText().substring(comments[i].pos, comments[i].end));
      if (parsed !== null && parsed.tags.some(t => FILEOVERVIEW_COMMENTS.has(t.tagName))) {
        fileoverviewIdx = i;
        break;
      }
    }
    // Add a @suppress {checkTypes} tag to each source file's JSDoc comment,
    // being careful to retain existing comments and their @suppress'ions.
    // Closure Compiler considers the *last* comment with @fileoverview (or @externs or @nocompile)
    // that has not been attached to some other tree node to be the file overview comment, and
    // only applies @suppress tags from it.
    // AJD considers *any* comment mentioning @fileoverview.
    if (fileoverviewIdx === -1) {
      // No existing comment to merge with, just emit a new one.
      const commentText = jsdoc.toString([
        {tagName: 'fileoverview', text: 'added by tsickle'},
        {tagName: 'suppress', type: 'checkTypes', text: 'checked by tsc'},
      ]);
      return ts.addSyntheticLeadingComment(
          sf, ts.SyntaxKind.MultiLineCommentTrivia, commentText, true);
    }

    // There is an existing comment - we need to convert comments to be synthetic, and disable
    // emitting comments for all nodes that could contain them.
    skipLeadingCommentsRecursively(sf);

    for (const comment of comments.slice(0, fileoverviewIdx)) {
      sf = ts.addSyntheticLeadingComment(
          sf, comment.kind, sf.text.substring(comment.pos, comment.end), comment.hasTrailingNewLine);
    }

    const comment = comments[fileoverviewIdx];
    const parsed = jsdoc.parse(sf.getFullText().substring(comment.pos, comment.end));
    if (!parsed) throw new Error('internal error: JSDoc comment does not parse');
    const {tags} = parsed;

    // Add @suppress {checkTypes}, or add to the list in an existing @suppress tag.
    // Closure compiler barfs if there's a duplicated @suppress tag in a file, so the tag must
    // only appear once and be merged.
    const suppressIdx = tags.findIndex(t => t.tagName === 'suppress');
    if (suppressIdx !== -1) {
      const suppressions = tags[suppressIdx].type || '';
      const suppressionsList = suppressions.split(',').map(s => s.trim());
      if (suppressionsList.indexOf('checkTypes') === -1) {
        suppressionsList.push('checkTypes');
      }
      tags[suppressIdx].type = suppressionsList.join(',');
    } else {
      tags.push({
        tagName: 'suppress',
        type: 'checkTypes',
        text: 'checked by tsc',
      });
    }
    const commentText = jsdoc.toString(tags);
    sf = ts.addSyntheticLeadingComment(sf, ts.SyntaxKind.MultiLineCommentTrivia, commentText, true);

    for (const comment of comments.slice(0, fileoverviewIdx)) {
      sf = ts.addSyntheticLeadingComment(
          sf, comment.kind, sf.text.substring(comment.pos, comment.end), comment.hasTrailingNewLine);
    }
    return sf;
  }
}
