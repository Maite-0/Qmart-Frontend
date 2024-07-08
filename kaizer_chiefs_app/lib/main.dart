import 'package:flutter/material.dart';
import 'models/comment.dart';
import 'services/api_service.dart';
import 'screens/comment_details.dart';
import 'screens/new_comment.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CommentsScreen(),
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
    );
  }
}

class CommentsScreen extends StatefulWidget {
  @override
  _CommentsScreenState createState() => _CommentsScreenState();
}

class _CommentsScreenState extends State<CommentsScreen> {
  late Future<List<Comment>> futureComments;

  @override
  void initState() {
    super.initState();
    futureComments = ApiService().fetchComments();
  }

  Future<void> _refreshComments() async {
    setState(() {
      futureComments = ApiService().fetchComments();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(''),
        leading: const Padding(
          padding: EdgeInsets.all(8.0),
          child: Icon(Icons.menu),
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Icon(Icons.notifications),
          ),
        ],
      ),
      body: FutureBuilder<List<Comment>>(
        future: futureComments,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No comments found.'));
          } else {
            // Sort comments by createdAt in descending order
            final sortedComments = snapshot.data!
                .where((comment) => comment.createdAt != null)
                .toList()
              ..sort((a, b) => b.createdAt!.compareTo(a.createdAt!));

            return RefreshIndicator(
              onRefresh: _refreshComments,
              child: ListView.builder(
                padding: const EdgeInsets.all(8.0),
                itemCount: sortedComments.length,
                itemBuilder: (context, index) {
                  final comment = sortedComments[index];
                  return GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => CommentDetailsScreen(comment),
                        ),
                      );
                    },
                    child: CommentCard(comment: comment),
                  );
                },
              ),
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => NewCommentScreen()),
          ).then((_) {
            _refreshComments();
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class CommentCard extends StatefulWidget {
  final Comment comment;

  const CommentCard({Key? key, required this.comment}) : super(key: key);

  @override
  _CommentCardState createState() => _CommentCardState();
}

class _CommentCardState extends State<CommentCard> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    final replies = widget.comment.replies;
    final hasMoreThanTwoReplies = replies.length > 2;

    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.comment.name,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),
                Text(
                  widget.comment.createdAt != null
                      ? '${widget.comment.createdAt!.toLocal()}'.split(' ')[0]
                      : '',
                  style: const TextStyle(
                    fontSize: 12,
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4.0),
            Text(
              widget.comment.content,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 8.0),
            if (replies.isNotEmpty &&
                replies.any((reply) => reply.fanReply.trim().isNotEmpty))
              Column(
                children: [
                  Container(
                    constraints: BoxConstraints(
                      maxHeight: _isExpanded ? double.infinity : 100.0,
                    ),
                    child: ListView.builder(
                      physics: _isExpanded
                          ? const NeverScrollableScrollPhysics()
                          : const AlwaysScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: hasMoreThanTwoReplies && !_isExpanded
                          ? 2
                          : replies.length,
                      itemBuilder: (context, index) {
                        final reply = replies[index];
                        if (reply.fanReply.trim().isEmpty) {
                          return const SizedBox.shrink();
                        }
                        return ReplyCard(reply: reply);
                      },
                    ),
                  ),
                  if (hasMoreThanTwoReplies)
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _isExpanded = !_isExpanded;
                        });
                      },
                      child: Text(_isExpanded ? 'Show less' : 'Show more'),
                    ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

class ReplyCard extends StatelessWidget {
  final Reply reply;

  ReplyCard({Key? key, required this.reply}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 8.0),
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(8.0),
      ),
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                reply.fanName ?? 'Anonymous',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              Text(
                reply.createdAt != null
                    ? '${reply.createdAt!.toLocal()}'.split(' ')[0]
                    : '',
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4.0),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(
                Icons.reply,
                size: 16.0,
                color: Colors.grey,
              ),
              const SizedBox(width: 8.0),
              Expanded(
                child: Text(
                  reply.fanReply,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Colors.black54,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
