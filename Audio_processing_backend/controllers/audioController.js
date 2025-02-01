const fs = require('fs');
const { exec } = require('child_process');
const Conversion = require('../models/Conversion');
const { PythonShell } = require('python-shell');



exports.processAudio = async (req, res) => {
    try {
        const { file } = req; // Uploaded file
        const { instrumentUsed } = req.body;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!instrumentUsed) {
            return res.status(400).json({ message: 'Instrument used is required' });
        }

        const inputFilePath = file.path;
        const outputFilePath = `uploads/processed-${file.filename}`;

        // Prepare options for the Python script
        const options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: './python-scripts', // Directory where the Python script is located
            args: [inputFilePath, outputFilePath],
        };

        // Set up a variable to capture Python stdout logs
        let pythonOutput = '';

        // Execute Python script
        const pyshell = new PythonShell('process_audio.py', options);

        // Capture stdout and stderr streams
        pyshell.stdout.on('data', function (data) {
            console.log('Python stdout:', data);
            pythonOutput += data;  // Append the stdout data for logging
        });

        pyshell.stderr.on('data', function (data) {
            console.error('Python stderr:', data);
        });

        // Handle the end of the Python script execution
        pyshell.end(async function (err, code, signal) {
            if (err) {
                console.error('Error during Python script execution:', err);
                return res.status(500).json({ message: 'Error during audio processing', error: err.message });
            }

            console.log('Python script executed successfully, results:', pythonOutput);

            // Save conversion details in MongoDB
            const conversion = new Conversion({
                userId: req.userId,
                instrumentUsed,
                originalFilePath: inputFilePath,
                processedFilePath: outputFilePath,
            });

            try {
                await conversion.save();
                console.log('Conversion saved:', conversion); // Confirm the document is saved
                res.status(201).json({ message: 'File processed successfully', conversion });
            } catch (saveError) {
                console.error('Error saving conversion to MongoDB:', saveError.message);
                res.status(500).json({ message: 'Failed to save conversion', error: saveError.message });
            }
        });

    } catch (error) {
        console.error('Error processing audio:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Download Processed Audio
exports.downloadAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const conversion = await Conversion.findById(id);

        if (!conversion) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = path.join(__dirname, '..', conversion.processedFilePath);
        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({ message: 'Error downloading file' });
            }
        });

    } catch (error) {
        console.error('Download error:', error.message);
        res.status(500).json({ message: 'Error downloading file', error: error.message });
    }
};

// Delete Audio
exports.deleteAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const conversion = await Conversion.findById(id);

        if (!conversion) {
            return res.status(404).json({ message: 'File not found' });
        }

        fs.unlinkSync(path.join(__dirname, '..', conversion.originalFilePath));
        fs.unlinkSync(path.join(__dirname, '..', conversion.processedFilePath));

        await Conversion.findByIdAndDelete(id);

        res.json({ message: 'File deleted successfully' });

    } catch (error) {
        console.error('Error deleting file:', error.message);
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
};

// Share Audio (Generate Sharable Link)
exports.shareAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const conversion = await Conversion.findById(id);

        if (!conversion) {
            return res.status(404).json({ message: 'File not found' });
        }

        const sharableLink = `${req.protocol}://${req.get('host')}/api/audio/download/${id}`;
        res.json({ message: 'Share link generated', link: sharableLink });

    } catch (error) {
        console.error('Error generating share link:', error.message);
        res.status(500).json({ message: 'Error generating share link', error: error.message });
    }
};