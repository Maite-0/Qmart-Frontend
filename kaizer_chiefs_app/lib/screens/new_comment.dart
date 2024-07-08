import 'package:flutter/material.dart';
import '../services/api_service.dart';

class NewCommentScreen extends StatefulWidget {
  @override
  _NewCommentScreenState createState() => _NewCommentScreenState();
}

class _NewCommentScreenState extends State<NewCommentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _commentController = TextEditingController();
  bool _isSubmitting = false;

  @override
  void dispose() {
    _nameController.dispose();
    _commentController.dispose();
    super.dispose();
  }

  Future<void> _submitComment() async {
    if (_formKey.currentState!.validate() && !_isSubmitting) {
      setState(() {
        _isSubmitting = true;
      });

      final name = _nameController.text;
      final comment = _commentController.text;

      try {
        await ApiService().addComment(name, comment);
        Navigator.pop(context);
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to add comment: $e')),
        );
      } finally {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          '',
          style: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16.0),
              TextFormField(
                controller: _commentController,
                decoration: const InputDecoration(
                  labelText: 'Comment',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your comment';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: _isSubmitting ? null : _submitComment,
                child: _isSubmitting
                    ? const CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      )
                    : const Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
