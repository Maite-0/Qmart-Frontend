import 'package:flutter/material.dart';
import '../models/comment.dart';
import '../services/api_service.dart';

class CommentDetailsScreen extends StatefulWidget {
  final Comment comment;

  CommentDetailsScreen(this.comment);

  @override
  _CommentDetailsScreenState createState() => _CommentDetailsScreenState();
}

class _CommentDetailsScreenState extends State<CommentDetailsScreen> {
  final _replyController = TextEditingController();
  final _fanNameController = TextEditingController();
  late Future<List<Comment>> futureComments;

  @override
  void initState() {
    super.initState();
    futureComments = ApiService().fetchComments();
  }

  @override
  void dispose() {
    _replyController.dispose();
    _fanNameController.dispose();
    super.dispose();
  }

  Future<void> _refreshComments() async {
    setState(() {
      futureComments = ApiService().fetchComments();
    });
  }

  Future<void> _submitReply() async {
    final commentId = widget.comment.id;
    final reply = _replyController.text.trim();
    final fanName = _fanNameController.text.trim();

    if (reply.isNotEmpty && fanName.isNotEmpty) {
      try {
        await ApiService().addReply(commentId, fanName, reply);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Reply added successfully')),
        );
        Navigator.pop(context);
        await _refreshComments(); 
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to add reply: $e')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter both fan name and a reply')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(''),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.comment.content,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16.0),

            const SizedBox(height: 8.0),
            TextFormField(
              controller: _fanNameController,
              decoration: const InputDecoration(
                labelText: 'Your name',
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your name';
                }
                return null;
              },
            ),
            const SizedBox(height: 8.0),
            TextFormField(
              controller: _replyController,
              decoration: const InputDecoration(
                labelText: 'Type your reply',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your reply';
                }
                return null;
              },
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _submitReply,
              child: const Text('Submit Reply'),
            ),
          ],
        ),
      ),
    );
  }
}
